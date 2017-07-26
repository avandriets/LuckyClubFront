import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthAsyncGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
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
            this.router.navigate(['main']);
            observer.next(false);
          }
        ) as Observable<boolean>;
      }
    );
  }
}
