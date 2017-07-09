import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CategoriesServiceService} from "../categories-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Category} from "../categories.model";

@Component({
  selector: 'lucky-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  categoryCreateFG: FormGroup = null;

  constructor(private catSrv: CategoriesServiceService, private router: Router, private route: ActivatedRoute) {
    this.categoryCreateFG = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    let data = {
      name: this.categoryCreateFG.get('categoryName').value,
      description: this.categoryCreateFG.get('description').value
    };
    this.catSrv.createCategory(data).subscribe(
      (outputData: Category) => {
        console.log('outputData' + outputData.id);
        // this.catSrv.createCategory(
        //   id: outputData.id,
        //   name: outputData.name,
        //   description: outputData.description
        // );
        this.router.navigate(['../' + outputData.id], {relativeTo:this.route});
      },
      (error) =>{
        console.log(error)
      }
    );
  }
}
