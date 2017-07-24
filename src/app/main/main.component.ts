import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Lot} from "../views/lots/lots.model";
import {Subscription} from "rxjs";
import {LotsServiseService} from "../services/lots-servise.service";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LoginStatusEnum} from "../auth/auth.model";

@Component({
  selector: 'lucky-main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {

  id: number = 0;
  lots: Lot[] = [];
  recommend_lots: Lot[] = [];
  favorite_lots: Lot[] = [];

  private subscription: Subscription;
  private authStatusSubscription: Subscription;

  constructor(private lotSrv: LotsServiseService,
              private router: Router,
              private route: ActivatedRoute,
              private authSrv: AuthService,
              private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
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
    this.lotSrv.getLots().subscribe(
      (data: Lot[]) => {
        this.lots = data;
      }
    );

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

  onMoreLot(){
    console.log('onMoreLot');
  }

  onMoreFavorite(){
    console.log('onMoreFavorite');
  }
}
