import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Lot} from "../lots/lots.model";

@Component({
  selector: 'lucky-lot-item-group',
  templateUrl: './lot-item-group.component.html',
  styleUrls: ['./lot-item-group.component.scss']
})
export class LotItemGroupComponent implements OnInit {

 @Input('headline') headline: string = "";
 @Input('lot') lot: Lot = new Lot();
 @Output('onMore') moreEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onMore(){
    this.moreEvent.emit();
  }
}
