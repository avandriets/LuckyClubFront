import { Component, OnInit } from '@angular/core';
import {Lot} from "../lots/lots.model";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {LotsServiseService} from "../lots/lots-servise.service";

@Component({
  selector: 'lucky-lot-detail-view',
  templateUrl: './lot-detail-view.component.html',
  styleUrls: ['./lot-detail-view.component.scss']
})
export class LotDetailViewComponent implements OnInit {

    id: number = 0;
    lot: Lot = new Lot();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private lotSrv: LotsServiseService) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.lotSrv.getLotByIdForAdmin(this.id)
                    .subscribe(
                        (data) => {
                            this.lot = data;
                            //console.log(this.lot.pictures);
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        );
    }

}
