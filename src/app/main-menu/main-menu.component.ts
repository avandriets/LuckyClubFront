import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInPopUpComponent} from "../auth/sign-in-pop-up/sign-in-pop-up.component";
import {AuthService} from "../services/auth.service";
import {Users, LoginStatusEnum} from "../auth/auth.model";

@Component({
  selector: 'lucky-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  currentUser: Users = null;

  constructor(private authSrv: AuthService) { }

  ngOnInit() {

    this.authSrv.invokeEvent.subscribe(
      (statusValue: LoginStatusEnum) => {
        this.getData();
      }
    );

    this.authSrv.getUserInfoFromServer().subscribe(
      (user: Users) => {
        this.currentUser = user;
      },
      (error) => {
        this.currentUser = null;
      }
    );
  }

  public getData() {
    this.authSrv.getUserInfoFromServer().subscribe(
      (user: Users) => {
        this.currentUser = user;
      },
      (error) => {
        this.currentUser = null;
      }
    );
  }

  onSearch(){
  }
}
