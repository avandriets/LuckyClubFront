import {Component, OnInit, Input} from '@angular/core';
import {Lot} from "../lots/lots.model";

@Component({
  selector: 'lucky-lot-item',
  templateUrl: 'lot-item.component.html',
  styleUrls: ['lot-item.component.scss']
})
export class LotPanelComponent implements OnInit {

  @Input('lot') current_lot: Lot = new Lot();
  constructor() { }

  ngOnInit() {
  }
}
