import {Component, OnInit, ViewChild, ApplicationRef, ChangeDetectorRef} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {SignInPopUpComponent} from "../auth/sign-in-pop-up/sign-in-pop-up.component";
import {LoginStatusEnum, Users} from "../auth/auth.model";
declare var UIkit: any;

@Component({
  selector: 'lucky-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: Users = null;
  @ViewChild(SignInPopUpComponent) authLoginDialog: SignInPopUpComponent;

  loginStatus = LoginStatusEnum;
  currentLoginStatus: LoginStatusEnum = LoginStatusEnum.LoggedOut;

  constructor(private authService: AuthService/*, private app: ApplicationRef*/, private changeDetection: ChangeDetectorRef) {
    this.currentLoginStatus = authService.isAuthenticated();
    this.authService.invokeEvent.subscribe(value => this.loginProcessStateChange(value));
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onLogOut() {
    this.authService.logOut();
  }

  openAuthDialog() {
    this.authLoginDialog.openDialog();
  }

  loginProcessStateChange(state: LoginStatusEnum) {

    if (state != LoginStatusEnum.FinishError) {
      this.currentLoginStatus = state;
    } else if (this.currentLoginStatus != LoginStatusEnum.FinishError && this.currentLoginStatus != LoginStatusEnum.LoggedOut) {
      UIkit.notification("Cannot login to server", {status: 'danger'});
      this.currentLoginStatus = LoginStatusEnum.LoggedOut;
    }

    this.currentUser = this.authService.getCurrentUser();
    // this.app.tick();

    this.changeDetection.detectChanges();
  }
}
