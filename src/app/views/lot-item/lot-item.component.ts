import {Component, OnInit, Input} from '@angular/core';
import {Lot} from "../lots/lots.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LotsServiseService} from "../lots/lots-servise.service";

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

  onFavorite(id){
    this.lotSrv.setFavorite(id).subscribe(
      (data) => {
        console.log(data);

      },
      (error) => {
        console.log(error);
      }
    );
  }

  isFavorite():boolean {
    return this.lotSrv.isLotFavorite(this.item_lot);
  }
}
