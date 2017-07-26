import {Component, OnInit, ViewChild, ApplicationRef, ChangeDetectorRef} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {SignInPopUpComponent} from "../auth/sign-in-pop-up/sign-in-pop-up.component";
import {LoginStatusEnum, Users} from "../auth/auth.model";
import {Router} from "@angular/router";
import {LotsServiseService} from "../services/lots-servise.service";
import {Lot} from "../views/lots/lots.model";
declare var UIkit: any;

@Component({
  selector: 'lucky-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: Users = null;
  @ViewChild(SignInPopUpComponent) authLoginDialog: SignInPopUpComponent;

  loginStatus = LoginStatusEnum;
  currentLoginStatus: LoginStatusEnum = LoginStatusEnum.LoggedOut;

  user_lots: Lot[] = [];
  favorite_lots: Lot[] = [];


  constructor(private authService: AuthService/*, private app: ApplicationRef*/,
              private changeDetection: ChangeDetectorRef,
              private lotSrv: LotsServiseService,
              private router: Router) {
    this.currentLoginStatus = authService.isAuthenticated();
    this.authService.invokeEvent.subscribe(value => this.loginProcessStateChange(value));
    this.lotSrv.invokeEvent.subscribe(()=> this.getData());
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.getData();
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate([`main`]);
  }

  openAuthDialog() {
    this.authLoginDialog.openDialog();
  }

  loginProcessStateChange(state: LoginStatusEnum) {

    if (state != LoginStatusEnum.FinishError) {
      this.currentLoginStatus = state;
    } else if (this.currentLoginStatus != LoginStatusEnum.FinishError && this.currentLoginStatus != LoginStatusEnum.LoggedOut) {
      UIkit.notification("Cannot login to server", {status: 'danger'});
      this.currentLoginStatus = LoginStatusEnum.LoggedOut;
    }

    this.currentUser = this.authService.getCurrentUser();
    // this.app.tick();

    this.changeDetection.detectChanges();
  }

  getData() {

    this.lotSrv.getUserLots().subscribe(
      (data: Lot[]) => {
        this.user_lots = data;
      }
    );

    this.lotSrv.getFavorites().subscribe(
      (data: Lot[]) => {
        this.favorite_lots = data;
        this.changeDetection.detectChanges();
      },
      (error) => {
        this.favorite_lots = [];
      }
    );
  }

  getFavoritesCount(): number {
    return this.favorite_lots.length;
  }

  getWInCount(): number {
    let sum = 0;
    if(this.authService.current_user){
     for(let i of this.user_lots) {
      if(i.winner_id == this.authService.current_user.id) {
        sum ++;
      }
     }
    }

    return sum;
  }
}
