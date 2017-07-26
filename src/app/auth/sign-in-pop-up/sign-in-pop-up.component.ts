import {Component, OnInit, Output, EventEmitter} from '@angular/core';
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
      (data: Users) => {
        this.loginStatus.emit(LoginStatusEnum.LoggedIn);
        window.location.reload();
      },
      (error) => {
        this.loginStatus.emit(LoginStatusEnum.FinishError);
      }
    );
  }

  private onSignInByFacebook() {
    this.modal.hide();
    this.authService.signInByFacebookPopUp();
  }
}