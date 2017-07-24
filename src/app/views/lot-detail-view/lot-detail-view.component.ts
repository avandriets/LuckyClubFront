import {Component, OnInit} from '@angular/core';
import {Lot} from "../lots/lots.model";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {LotsServiseService} from "../../services/lots-servise.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'lucky-lot-detail-view',
  templateUrl: './lot-detail-view.component.html',
  styleUrls: ['./lot-detail-view.component.scss']
})
export class LotDetailViewComponent implements OnInit {

  id: number = 0;
  lot: Lot = new Lot();
  recommend_lots: Lot[] = [];
  private subscription: Subscription;
  private users_lots: Lot[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private lotSrv: LotsServiseService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.lotSrv.getLotByIdForAdmin(this.id)
          .subscribe(
            (data) => {
              this.lot = data;

              this.getData();
            },
            (error) => {
              console.log(error);
            }
          );
      }
    );

    this.subscription = this.lotSrv.invokeEvent
      .subscribe(
        () => {
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

    this.lotSrv.getUserLots().subscribe(
      (data: Lot[]) => {
        this.users_lots = data;
      }
    );
  }

  lotWasBought(): boolean{
    if(this.lot) {
      for(let i of this.users_lots){
        if(i.id === this.lot.id) {
          return true;
        }
      }

      return false;
    }else {
      return false;
    }
  }

  onMoreRecommend() {
    console.log('onMoreRecommend');
  }

}
