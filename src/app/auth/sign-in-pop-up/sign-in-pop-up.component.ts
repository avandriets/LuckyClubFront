import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../auth.service";
import {LoginStatusEnum} from "../auth.model";
declare var UIkit: any;

@Component({
  selector: 'lucky-sign-in-pop-up',
  templateUrl: './sign-in-pop-up.component.html',
  styleUrls: ['./sign-in-pop-up.component.css']
})
export class SignInPopUpComponent implements OnInit {

  @Output() loginStatus = new EventEmitter<LoginStatusEnum>();
  private modal: any = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.modal = UIkit.modal("#modal-close-default");
  }

  openDialog() {
    this.modal.show();
  }

  private onSignInByGoogle() {
    //TODO optimize invoke chain of events
    this.loginStatus.emit(LoginStatusEnum.inProcess);
    this.modal.hide();
    this.authService.signInByGooglePopUp().subscribe(
      (signInObservable) => {
        signInObservable.subscribe(
          (getTokenObservable) => {
            console.log(getTokenObservable);
            getTokenObservable.subscribe(
              (signInToLuckyServer) => {
                console.log(signInToLuckyServer);
                signInToLuckyServer.subscribe(
                  (data) => {
                    console.log(data);
                    this.loginStatus.emit(LoginStatusEnum.Finish);
                  },
                  (error) => {
                    this.loginStatus.emit(LoginStatusEnum.Finish);
                  }
                )
              },
              (error) => {
                this.loginStatus.emit(LoginStatusEnum.Finish);
              }
            )
          },
          (error) => {
            this.loginStatus.emit(LoginStatusEnum.Finish);
          }
        );
      },
      (error) => {
        this.loginStatus.emit(LoginStatusEnum.Finish);
      }
    );
  }

  private onSignInByFacebook() {
    this.modal.hide();
    this.authService.signInByFacebookPopUp();
  }
}
