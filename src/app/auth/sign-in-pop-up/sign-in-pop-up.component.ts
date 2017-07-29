import {Component, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginStatusEnum, Users} from "../auth.model";
declare var UIkit: any;

@Component({
  selector: 'lucky-sign-in-pop-up',
  templateUrl: './sign-in-pop-up.component.html',
  styleUrls: ['./sign-in-pop-up.component.scss']
})
export class SignInPopUpComponent implements OnInit {

  @Output() loginStatus = new EventEmitter<LoginStatusEnum>();
  private modal: any = null;

  constructor(private authService: AuthService, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.modal = UIkit.modal("#modal-close-default");
  }

  openDialog() {
    this.modal.show();
  }

  onSignInByGoogle() {
    //TODO optimize invoke chain of events
    this.loginStatus.emit(LoginStatusEnum.inProcess);
    this.modal.hide();


    this.ngZone.runOutsideAngular(() => {

      this.authService.signInByGooglePopUp().subscribe(
        (data: Users) => {
          this.ngZone.run(() => {
            // this.loginStatus.emit(LoginStatusEnum.FinishError);
            this.loginStatus.emit(LoginStatusEnum.LoggedIn);
          });
          // window.location.reload();
        },
        (error) => {
          this.ngZone.run(() => {
            this.loginStatus.emit(LoginStatusEnum.FinishError);
          });

        }
      );

    });

    // this.authService.signInByGooglePopUp().subscribe(
    //   (data: Users) => {
    //     this.loginStatus.emit(LoginStatusEnum.LoggedIn);
    //     // window.location.reload();
    //   },
    //   (error) => {
    //     this.loginStatus.emit(LoginStatusEnum.FinishError);
    //   }
    // );
  }

  onSignInByFacebook() {
    this.modal.hide();
    this.authService.signInByFacebookPopUp();
  }
}
