import {Component, OnInit, Input} from '@angular/core';
import {Lot} from "../lots/lots.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LotsServiseService} from "../../services/lots-servise.service";

@Component({
  selector: 'lucky-lot-item',
  templateUrl: 'lot-item.component.html',
  styleUrls: ['lot-item.component.scss']
})
export class LotPanelComponent implements OnInit {

  @Input('lot') item_lot: Lot = new Lot();

  constructor(private lotSrv: LotsServiseService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onFavorite(item: Lot) {
    if (item) {
      this.lotSrv.setFavorite(item.id).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getLotState() {
    if (this.item_lot.finished && this.item_lot.winner_id){
      return 1;
    } else if (this.item_lot.count_joined == this.item_lot.count_participants){
      return 0;
    } else {
      return -1;
    }
  }

  isFavorite():boolean {
    return this.lotSrv.isLotFavorite(this.item_lot);
  }

  onDetail() {
    this.router.navigate(['lots', this.item_lot.id]);
  }
}
