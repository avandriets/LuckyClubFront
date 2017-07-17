import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute, Router} from "@angular/router";
import {LotsServiseService} from "../lots-servise.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Lot} from "../lots.model";

@Component({
  selector: 'lucky-edit-lot',
  templateUrl: './edit-lot.component.html',
  styleUrls: ['./edit-lot.component.scss']
})
export class EditLotComponent implements OnInit {
  id: number = null;
  lot: Lot = null;
  lotEditFG: FormGroup = null;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private lotSrv: LotsServiseService) {
    this.lotEditFG = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      category_id: new FormControl(null, Validators.required),
      count_participants: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.lotSrv.getLotById(this.id)
          .subscribe(
            (data) => {
              this.lot = data;
              // this.parentCategoriesList =
              //   new CategoriesCollection(this.categoriesServiceService.categories).getParentCategories(data);

              this.lotEditFG.patchValue(
                {
                  name: data.name,
                  description: data.description,
                  category_id: data.category_id,
                  count_participants: data.count_participants,
                  price: data.ptice
                }
              );

            },
            (error) => {
              console.log(error);
            }
          );
      }
    );
  }
  onSubmit() {
        console.log("save");
  }
  onCancel() {
    console.log(this.id);
    this.router.navigate(['lots', this.id]);
  }

}
