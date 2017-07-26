import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {Http, RequestOptions, Headers, URLSearchParams, Response, RequestMethod} from "@angular/http";
import {Observable} from "rxjs";
import {Users, LoginStatusEnum} from "../auth/auth.model";
import 'rxjs/add/operator/mergeMap';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Subject} from 'rxjs/Subject';
import {environment} from "../../environments/environment";
import {Utils} from "../helpers/utilities";
import {AuthHttpService} from "../helpers/auth-http.service";

@Injectable()
export class AuthService {

  invokeEvent: Subject<any> = new Subject();

  callComponent(value: LoginStatusEnum) {
    this.invokeEvent.next(value)
  }

  private client_id =  environment.client_id;
  private client_secret = environment.client_secret;

  lucky_access_token: string;
  current_user: Users = null;

  constructor(private route: Router,
              private http: Http,
              public afAuth: AngularFireAuth,
              private authSrv: AuthHttpService) {
  }

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      error => console.log(error)
    );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {

          this.route.navigate(['/']);
          firebase.auth().currentUser.getToken().then(
            (token: string) => {
              //this.token = token;
              //console.log(this.token);
            }
          )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signInByGooglePopUp(): Observable<Users> {
    this.callComponent(LoginStatusEnum.inProcess);

    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
      .flatMap(
        () => {
          return this.getToken();
        }
      ).flatMap((token: string) => {
        return this.loginToLuckyServer(token);
      })
      .map(
        (dataLogInFromServer) => {
          this.lucky_access_token = dataLogInFromServer.access_token;
          localStorage.setItem('token', this.lucky_access_token);
          return dataLogInFromServer.access_token;
        }).flatMap(
        (token: string) => {
          this.callComponent(LoginStatusEnum.LoggedIn);
          return this.getUserInfoFromServer();
        }
      ).map(
        (userInfo: Users) => {
          this.current_user = userInfo;
          localStorage.setItem('current_user', JSON.stringify(userInfo));
        }
      )
      .catch((error: Response) => {
        console.log(error);
        this.callComponent(LoginStatusEnum.FinishError);
        return Observable.throw(error);
      });
  }

  getUserInfoFromServer(): Observable<Users> {
    // let headers = new Headers(
    //   {
    //     'Content-Type': 'application/json',
    //     'Accept': '*/*',
    //     'Authorization': "Bearer " + this.lucky_access_token
    //   }
    // );
    //
    // let options = new RequestOptions({headers: headers});
    //
    // return this.http.get(environment.hostUrl + Utils.profileMeUrl, options)
    //   .map((request: Response) => {
    //     return request.json() as Users;
    //   })
    //   .catch((error: Response) => {
    //     return Observable.throw(error);
    //   });

    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': "Bearer " + this.lucky_access_token
      }
    );

    let options = new RequestOptions({headers: headers});

    return this.authSrv.get(environment.hostUrl + Utils.profileMeUrl)
      .map((request: Response) => {
        return request.json() as Users;
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  loginToLuckyServer(token: string): Observable<{refresh_token: string, token_type: string, scope: string, access_token: string}> {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    );

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', 'user');
    params.set('password', '12345');
    params.set('client_id', this.client_id);
    params.set('client_secret', this.client_secret);
    params.set('jwt_token', token);

    let options = new RequestOptions({headers: headers, params: params});

    return this.http.post(environment.hostUrl + Utils.tokenUrl, {},
      options
    ).map((request: Response) => {
        // console.log(request.json());
        return request.json();
      }
    ).catch((error: Response) => {
      // console.log(error);
      return Observable.throw(error);
    });
  }

  signInByFacebookPopUp(): void {
    //TODO implement facebook login
    console.log("implement facebook login")
  }

  getToken(): Observable<any> {
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.currentUser.getIdToken());
  }

  isAuthenticated(): LoginStatusEnum {
    return (localStorage.getItem("token") === null) ? LoginStatusEnum.LoggedOut : LoginStatusEnum.LoggedIn;
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.current_user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    this.callComponent(LoginStatusEnum.LoggedOut);
  }

  getCurrentUser(): Users {
    let UserJSON = localStorage.getItem("current_user");
    if (UserJSON != null) {
      return JSON.parse(UserJSON) as Users;
    } else {
      return null;
    }
  }

  updateProfile(data: any) : Observable<Users> {

    let input = new FormData();

    if(data.file){
      input.append('file', data.file);
    }

    input.append('first_name', data.first_name);
    input.append('last_name', data.last_name);
    input.append('screen_name', data.screen_name);
    input.append('email', data.email);
    input.append('bank_card', data.bank_card);
    input.append('phone', data.phone);

    let headers = new Headers(
      {
        'Accept': '*/*'
      }
    );

    let urlString = `${environment.hostUrl}${Utils.profileMeUrl}`;

    let options = new RequestOptions({headers: headers});
    options.body = input;
    options.url = urlString;
    options.method = RequestMethod.Put;

    return this.authSrv.put(urlString, input, options).map(
      (data: Response) => {
        this.callComponent(LoginStatusEnum.LoggedIn);
        return data.json() as Users;
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }
}
