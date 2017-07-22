import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../categories-service.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Category, CategoriesCollection} from "../categories.model";

@Component({
  selector: 'lucky-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  id: number = null;
  category: Category = null;
  categoryEditFG: FormGroup = null;
  file:any = null;
  parentCategoriesList: Category[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriesServiceService: CategoriesService) {

    this.categoryEditFG = new FormGroup({
      parentCategory: new FormControl(null),
      imageFile: new FormControl(null),
      categoryName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });

  }

  onFileChange(event) {
    this.file = event.target.files[0];
  }

  onImageClear(){
    this.file = null;
    this.categoryEditFG.get('imageFile').setValue(null);
  }

  onParentClear(){
    this.categoryEditFG.get('parentCategory').setValue(null);
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.categoriesServiceService.getCategoryById(this.id)
          .subscribe(
            (data) => {
              this.category = data;
              this.parentCategoriesList =
                new CategoriesCollection(this.categoriesServiceService.categories).getParentCategories(data);

              this.categoryEditFG.patchValue(
                {
                  parentCategory: data.parent_id,
                  categoryName: data.name,
                  description: data.description
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

    //TODO add clear category functionality
    let data = {
      id: this.id,
      parent_id: this.categoryEditFG.get('parentCategory').value,
      file: this.file,
      name: this.categoryEditFG.get('categoryName').value,
      description: this.categoryEditFG.get('description').value
    };

    this.categoriesServiceService.updateCategory(data).subscribe(
      (data: Category)=>{
        this.router.navigate(['admin-categories', this.id]);
      },
      (error)=>{
        console.log('Error');
      }
    );
  }

  onCancel() {
    this.router.navigate(['admin-categories', this.id]);
  }

}
