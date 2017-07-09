import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute, Router} from "@angular/router";
import {CategoriesServiceService} from "../categories-service.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Subcategory} from "../subcategories.model";

@Component({
  selector: 'lucky-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  id: number = null;
  categoryEditFG: FormGroup = null;
  subcategories: Subcategory[] = [
    new Subcategory(1, '1ffgfgfc', '1iojojoiiihu'),
    new Subcategory(2, '2ffgfgfc', '2iojojoiiihu')
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriesServiceService: CategoriesServiceService) {
    this.categoryEditFG = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.categoriesServiceService.getCategoryById(+params['id'])
          .subscribe(
            (data) => {
              this.categoryEditFG.setValue({categoryName: data.name, description: data.description});
            },
            (error) => {
              console.log(error);
            }
          );
        // console.log(this.id);
        // console.log(this.categorie);
      }
    );
  }

  onSubmit() {
    //this.categoriesServiceService.updateCategory();
  }

  onCansel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
