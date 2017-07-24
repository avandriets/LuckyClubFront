import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {LoginStatusEnum} from "./auth.model";
import Promise = firebase.Promise;

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.authService.isAuthenticated() == LoginStatusEnum.LoggedIn;
  }

}
