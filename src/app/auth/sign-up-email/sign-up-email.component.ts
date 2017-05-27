import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'lucky-sign-up',
  templateUrl: 'sign-up-email.component.html',
  styleUrls: ['sign-up-email.component.css']
})
export class SignUpEmailComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signUpUser(email, password);
  }

}
