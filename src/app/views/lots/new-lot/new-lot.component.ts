import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'lucky-new-lot',
  templateUrl: './new-lot.component.html',
  styleUrls: ['./new-lot.component.scss']
})
export class NewLotComponent implements OnInit {
  lotCreateFG: FormGroup = null;
  file:any = null;

  constructor() { }

  ngOnInit() {
  }

}
