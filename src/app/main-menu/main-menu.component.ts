import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInPopUpComponent} from "../auth/sign-in-pop-up/sign-in-pop-up.component";

@Component({
  selector: 'lucky-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @ViewChild(SignInPopUpComponent) dialogTest: SignInPopUpComponent;

  constructor() { }

  ngOnInit() {
  }

  openDialog(){
    this.dialogTest.openDialog();
  }
}
