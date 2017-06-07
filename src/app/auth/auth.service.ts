import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from "@angular/router";
import {Http, RequestOptions, Headers, URLSearchParams, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Users} from "./auth.model";
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AuthService {

  private client_id = 'W0q9nM5We3rKT8gyHIG1Mhmu8d7B7yqgoSPrDDTr';
  private client_secret = 'UbU2pLbXVRsjCbVR0e75o31jdGCJIcnEa1rkwRZ1gq7MwREJDX';

  lucky_access_token: string;
  current_user: Users = null;

  constructor(private route: Router, private http: Http) {
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
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    return Observable.fromPromise(<Promise<any>>firebase.auth().signInWithPopup(provider))
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
          return this.getUserInfoFromServer();
        }
      )
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  getUserInfoFromServer(): Observable<Users> {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': "Bearer " + this.lucky_access_token
      }
    );

    let options = new RequestOptions({headers: headers});

    return this.http.get('http://127.0.0.1:8000/api/profile/me', options)
      .map((request: Response) => {
        console.log(request.json());
        this.current_user = request.json() as Users;
        return this.current_user;
      })
      .catch((error: Response) => {
        console.log(error);
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

    return this.http.post('http://127.0.0.1:8000/oauth/token', {},
      options
    ).map((request: Response) => {
        console.log(request.json());
        return request.json();
      }
    ).catch((error: Response) => {
      console.log(error);
      return Observable.throw(error);
    });
  }

  signInByFacebookPopUp(): void {
    //TODO implement facebook login
    console.log("implement facebook login")
  }

  getToken(): Observable<any> {
    return Observable.fromPromise(<Promise<any>>firebase.auth().currentUser.getToken());
  }

  isAuthenticated():boolean {
    // return this.current_user != null;
    return (localStorage.getItem("token") === null) ? false : true;
  }

  logOut() {
    firebase.auth().signOut();
    this.current_user = null;
    localStorage.removeItem('token');
  }

}
