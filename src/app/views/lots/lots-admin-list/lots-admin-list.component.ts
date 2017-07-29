import {Component, OnInit, Input} from '@angular/core';
import {LotsServiseService} from "../../../services/lots-servise.service";
import {Lot} from "../lots.model";

@Component({
  selector: 'lucky-lots-admin-list',
  templateUrl: './lots-admin-list.component.html',
  styleUrls: ['./lots-admin-list.component.scss']
})
export class LotsAdminListComponent implements OnInit {
  @Input('lot') lots: Lot = new Lot();
  //@Input('lot') item_lot: Lot = new Lot();

  constructor(private lotSrv: LotsServiseService) {
  }

  ngOnInit() {
  }

  onPush(id) {
    this.lotSrv.publishLot(id).subscribe(
      (data) => {
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onUnPush(id) {
    this.lotSrv.unPublishLot(id).subscribe(
      (data) => {
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onRecommendedLot(id) {
    this.lotSrv.recommendedLot(id).subscribe(
      (data) => {
        console.log('0:' + data)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onDelete(id) {
    this.lotSrv.deleteLot(id).subscribe(
      (data) => {
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onUnDelete(id) {
    this.lotSrv.unDeleteLot(id).subscribe(
      (data) => {
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
