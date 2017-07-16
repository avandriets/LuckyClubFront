import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Category} from "../categories.model";
import {CategoriesServiceService} from "../categories-service.service";

@Component({
  selector: 'lucky-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
              private categoriesServiceService: CategoriesServiceService) {
  }

  id: number = null;
  name: string = "";
  description: string = "";
  parent_id: number = null;
  picture_url: string = "";

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.categoriesServiceService.getCategoryById(+params['id'])
          .subscribe(
            (data) => {

              this.name = data.name;
              this.description = data.description;
              this.parent_id = data.parent_id;
              this.picture_url = data.picture_url;
            },
            (error) => {
              console.log(error);
            }
          );
      }
    );
  }

  onEditCategory() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCategory() {
    //TODO add check response functionality
    this.categoriesServiceService.deleteCategory(this.id).subscribe(
      (data)=>{
        this.router.navigate(['categories']);
      }
    );
  }
}
