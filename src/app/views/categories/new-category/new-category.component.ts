import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CategoriesService} from "../../../services/categories-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Category} from "../categories.model";
import {CategoriesCollection} from "../categories.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'lucky-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  categoryCreateFG: FormGroup = null;
  file:any = null;

  parentCategoriesList: Category[] = [];
  private fileToShow: string;

  constructor(private catSrv: CategoriesService,
              private router: Router,
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer) {
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

  onFileChange(e) {

    let upFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    if(!upFile){
      return;
    }

    let pattern = /image-*/;
    let reader = new FileReader();

    if (!upFile.type.match(pattern)) {
      alert('invalid format');
      this.categoryCreateFG.get('imageFile').setValue('');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);

    reader.readAsDataURL(upFile);
    this.file = upFile;
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.fileToShow =  reader.result;
  }

  onImageClear(){
    this.file = null;
    this.fileToShow = "";
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
