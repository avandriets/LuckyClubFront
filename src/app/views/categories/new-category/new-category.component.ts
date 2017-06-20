import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CategoriesServiceService} from "../categories-service.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'lucky-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
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
      (outputData) => {
        console.log(outputData);
      },
      (error) =>{
        console.log(error)
      }
    );
  }

}
