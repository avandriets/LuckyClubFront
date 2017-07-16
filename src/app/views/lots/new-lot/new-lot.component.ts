import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'lucky-new-lot',
  templateUrl: './new-lot.component.html',
  styleUrls: ['./new-lot.component.scss']
})
export class NewLotComponent implements OnInit {
  lotCreateFG: FormGroup = null;
  file:any = null;

  constructor(  ) {

     this.lotCreateFG = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        category_id: new FormControl(null, Validators.required),
        price:  new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
  }
  onSubmit(){

  }

}
