import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'lucky-sign-in-email',
  templateUrl: 'sign-in-email.component.html',
  styleUrls: ['sign-in-email.component.scss'],
})
export class SignInEmailComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signInUser(email, password);
  }

}
