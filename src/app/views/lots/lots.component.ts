import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LotsServiseService} from "./lots-servise.service";
import {Lot} from "./lots.model";
import {Subscription} from "rxjs";
import {CategoriesCollection, Category} from "../categories/categories.model";

@Component({
  selector: 'lucky-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {
  lots: Lot[] = [];
  private subscription: Subscription;

  constructor(private lotSrv: LotsServiseService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.lotSrv.invokeEvent
      .subscribe(
        (lots: Lot[]) => {
          this.lots = lots;
        }
      );

    this.lotSrv.getDrafts().subscribe(
      (data: Lot[]) => {
        this.lots = data;
        console.log(this.lots);
      }
    );
  }

  onNewLot() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
