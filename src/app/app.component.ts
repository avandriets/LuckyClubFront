import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";
declare var UIkit: any;

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(){
  }

  ngOnInit(): void {
    firebase.initializeApp(environment.firebase);
  }

  login() {
  }

  logout() {
  }
}
