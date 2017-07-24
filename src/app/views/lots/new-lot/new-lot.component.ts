import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {LotsServiseService} from "../../../services/lots-servise.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Lot} from "../lots.model";
import {Category, CategoriesCollection} from "../../categories/categories.model";
import {CategoriesService} from "../../../services/categories-service.service";


@Component({
  selector: 'lucky-new-lot',
  templateUrl: './new-lot.component.html',
  styleUrls: ['./new-lot.component.scss']
})
export class NewLotComponent implements OnInit {
  lotCreateFG: FormGroup = null;
  file: any = null;
  categoriesCollection: Category[] = [];

  constructor(private lotSrv: LotsServiseService,
              private catSrv: CategoriesService,
              private router: Router,
              private route: ActivatedRoute) {
    this.lotCreateFG = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      full_description: new FormControl(null, Validators.required),
      category_id: new FormControl(null, Validators.required),
      count_participants: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
    this.catSrv.getCategories().subscribe(
      (dataCat: Category[]) => {
        this.categoriesCollection = new CategoriesCollection(dataCat).getParentCategories();
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onSubmit() {
    let data: Lot = new Lot();
    data.name = this.lotCreateFG.get('name').value;
    data.description = this.lotCreateFG.get('description').value;
    data.full_description = this.lotCreateFG.get('full_description').value;
    data.category_id = this.lotCreateFG.get('category_id').value;
    data.count_participants = this.lotCreateFG.get('count_participants').value;
    data.price = this.lotCreateFG.get('price').value;

    this.lotSrv.createLot(data).subscribe(
      (outputData: Lot) => {
        this.router.navigate([`../${outputData.id}/edit`], {relativeTo: this.route});
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
