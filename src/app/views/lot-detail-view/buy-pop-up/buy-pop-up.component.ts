import { Component, OnInit } from '@angular/core';
declare var UIkit: any;

@Component({
  selector: 'lucky-buy-pop-up',
  templateUrl: './buy-pop-up.component.html',
  styleUrls: ['./buy-pop-up.component.scss']
})
export class BuyPopUpComponent implements OnInit {
  private modal: any;

  constructor() { }

  ngOnInit() {
    this.modal = UIkit.modal("#modal-buy");
  }

  openDialog() {
    this.modal.show();
  }

  onBuy(){
    console.log("Купить");
  }
}
