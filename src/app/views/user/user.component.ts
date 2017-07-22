import { Component, OnInit } from '@angular/core';
import {Users} from "../../auth/auth.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'lucky-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  currentUser: Users = null;

    constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

}
