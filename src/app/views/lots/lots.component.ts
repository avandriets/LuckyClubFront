import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {LotsServiseService} from "../../services/lots-servise.service";
import {Lot} from "./lots.model";
import {Subscription} from "rxjs";
import {CategoriesCollection, Category} from "../categories/categories.model";

@Component({
  selector: 'lucky-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {
  id: number = 0;
  lots: Lot[] = [];
  dr_lots: Lot[] = [];
  del_lots: Lot[] = [];
  private subscription: Subscription;

  constructor(private lotSrv: LotsServiseService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.lotSrv.invokeEvent
      .subscribe(
        () => {
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
    this.lotSrv.getDrafts().subscribe(
      (data: Lot[]) => {
        this.dr_lots = data;
      }
    );
    this.lotSrv.getDeleted().subscribe(
      (data: Lot[]) => {
        this.del_lots = data;
      }
    );
  }

  onNewLot() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onPush(id) {
   this.lotSrv.publishLot(id).subscribe(
      (data) => { },
      (error) => {
        console.log(error)
      }
    );
  }
  onUnPush(id){
     this.lotSrv.unPublishLot(id).subscribe(
      (data) => {},
      (error) => {
        console.log(error)
      }
    );
  }
  onRecommendedLot(id){
     this.lotSrv.recommendedLot(id).subscribe(
      (data) => {
        console.log('0:'  + data)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onDelete(id) {
    this.lotSrv.deleteLot(id).subscribe(
      (data) => {},
      (error) => {
        console.log(error)
      }
    );
  }

  onUnDelete(id){
    this.lotSrv.unDeleteLot(id).subscribe(
      (data) => {},
      (error) => {
        console.log(error)
      }
    );
  }
}
