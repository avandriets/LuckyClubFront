import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {SignInPopUpComponent} from "../auth/sign-in-pop-up/sign-in-pop-up.component";
import {LoginStatusEnum, Users} from "../auth/auth.model";

@Component({
  selector: 'lucky-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser:Users = null;
  @ViewChild(SignInPopUpComponent) authLoginDialog: SignInPopUpComponent;

  inProgress: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.current_user;
  }

  onLogOut() {
    this.authService.logOut();
  }

  openAuthDialog() {
    this.authLoginDialog.openDialog();
  }

  loginProcessStateChange(state: LoginStatusEnum) {
    if (state == LoginStatusEnum.inProcess) {
      this.inProgress = true;
      console.log('START');
    } else if (state == LoginStatusEnum.Finish) {
      this.inProgress = false;
      this.currentUser = this.authService.current_user;
      console.log('FINISH');
    }
  }
}
