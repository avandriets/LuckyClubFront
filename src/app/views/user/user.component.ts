import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Users, LoginStatusEnum} from "../../auth/auth.model";
import {AuthService} from "../../auth/auth.service";
import {LotsServiseService} from "../lots/lots-servise.service";
import {Lot} from "../lots/lots.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'lucky-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  currentUser: Users = null;

  id: number = 0;
  recommend_lots: Lot[] = [];
  favorite_lots: Lot[] = [];

  private authStatusSubscription: Subscription;
  private subscription: Subscription;

    constructor(
      private lotSrv: LotsServiseService,
      private router: Router,
      private route: ActivatedRoute,
      private authSrv: AuthService,
      private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.currentUser = this.authSrv.getCurrentUser();


    this.subscription = this.lotSrv.invokeEvent
      .subscribe(
        () => {
          this.getData();
        }
      );

    this.authStatusSubscription = this.authSrv.invokeEvent.subscribe(
      (statusValue: LoginStatusEnum) => {
        this.getData();
      }
    );

    this.getData();

  }

  getData() {

    this.lotSrv.getRecommend().subscribe(
      (data: Lot[]) => {
        this.recommend_lots = data;
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

  onMoreRecommend() {
    console.log('onMoreRecommend');
  }

  onMoreFavorite(){
    console.log('onMoreFavorite');
  }
}
