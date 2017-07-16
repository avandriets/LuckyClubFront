import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CategoriesServiceService} from "../categories-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Category} from "../categories.model";
import {CategoriesCollection} from "../categories.model";

@Component({
  selector: 'lucky-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  categoryCreateFG: FormGroup = null;
  file:any = null;
  url;

  parentCategoriesList: Category[] = [];

  constructor(private catSrv: CategoriesServiceService, private router: Router, private route: ActivatedRoute) {
    this.categoryCreateFG = new FormGroup({
      parentCategory: new FormControl(null),
      imageFile: new FormControl(null),
      categoryName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.parentCategoriesList = new CategoriesCollection(this.catSrv.categories).getParentCategories();
  }

  onFileChange(event) {
   // this.file = event.target.files[0];
   // console.log( this.categoryCreateFG.imageFile.setValue());



     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.file = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onImageClear(){
    this.file = null;
    this.categoryCreateFG.get('imageFile').setValue(null);
  }

  onParentClear(){
    this.categoryCreateFG.get('parentCategory').setValue(null);
  }

  onSubmit() {

    let data = {
      parent_id: this.categoryCreateFG.get('parentCategory').value,
      file: this.file,
      name: this.categoryCreateFG.get('categoryName').value,
      description: this.categoryCreateFG.get('description').value
    };

    this.catSrv.createCategory(data).subscribe(
      (outputData: Category) => {
        this.router.navigate([`../${outputData.id}`], {relativeTo:this.route});
      },
      (error) =>{
        console.log(error)
      }
    );
  }

}
