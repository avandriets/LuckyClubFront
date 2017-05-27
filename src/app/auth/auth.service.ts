import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  token: string;

  constructor(private route: Router) {
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
              this.token = token;
              console.log(this.token);
            }
          )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signInByGooglePopUp(): void {

    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth().signInWithPopup(provider)
      .then(response => {
        console.log(response)
      })
      .catch(
        error => console.log(error)
      );
  }

  signInByFacebookPopUp(): void {
    //TODO implement facebook login
    console.log("implement facebook login")
  }

  getToken() {
    firebase.auth().currentUser.getToken().then(
      (token: string) => this.token = token
    );

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logOut() {
    firebase.auth().signOut();
    this.token = null;
  }

}
