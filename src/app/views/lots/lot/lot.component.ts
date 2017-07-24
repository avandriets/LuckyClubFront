import {Component, OnInit} from '@angular/core';
import {Lot} from "../lots.model";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {LotsServiseService} from "../../../services/lots-servise.service";

@Component({
    selector: 'lucky-lot',
    templateUrl: './lot.component.html',
    styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {

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

    onEditLot() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onDeleteLot() {

    }
    onNewLot(){
        this.router.navigate(['admin-lots/new']);
    }
}
