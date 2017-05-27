import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
declare var UIkit: any;

@Component({
  selector: 'lucky-sign-in-pop-up',
  templateUrl: './sign-in-pop-up.component.html',
  styleUrls: ['./sign-in-pop-up.component.css']
})
export class SignInPopUpComponent implements OnInit {

  private modal: any = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  openDialog() {
    this.modal = UIkit.modal("#modal-close-default");
    this.modal.show();
  }

  onSignInByGoogle() {
    this.modal.close();
    this.authService.signInByGooglePopUp();
  }

  onSignInByFacebook() {
    this.modal.close();
    this.authService.signInByFacebookPopUp();
  }

}
