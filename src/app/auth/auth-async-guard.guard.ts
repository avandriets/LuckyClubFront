import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthAsyncGuardGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.getUserInfoFromServer().map(
      (user) =>{
        return true;
      }
    ).catch(
      (error) => {

        return Observable.create(
          (observer)=>{
            observer.next(false);
          }
        ) as Observable<boolean>;
      }
    );
  }
}
