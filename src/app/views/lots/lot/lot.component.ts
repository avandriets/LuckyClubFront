import { Component, OnInit } from '@angular/core';
import {Lot} from "../lots.model";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {LotsServiseService} from "../lots-servise.service";

@Component({
  selector: 'lucky-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {
    id: number = null;
      lot: Lot = null;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private lotSrv: LotsServiseService) { }

ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.lotSrv.getLotById(this.id)
          .subscribe(
            (data) => {
              this.lot = data;
              console.log(this.lot);
              // this.name = data.name;
              // this.description = data.description;


            },
            (error) => {
              console.log(error);
            }
          );
      }
    );
  }

}
