import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {SignInPopUpComponent} from "../auth/sign-in-pop-up/sign-in-pop-up.component";

@Component({
  selector: 'lucky-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild(SignInPopUpComponent) authLoginDialog: SignInPopUpComponent;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.logOut();
  }

  openAuthDialog() {
    this.authLoginDialog.openDialog();
  }
}
