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

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.categoriesServiceService.getCategoryById( +params['id'] )
          .subscribe(
            (data) => {
              console.log('data:' + data);
              console.log('data.id:' + data.id);
              console.log('data.description:' + data.description);

              this.name = data.name;
              this.description = data.description;
            //  this.id = data.id;
            //  this.name = data.name;

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

  onEditCategory() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCategory() {
    console.log('Delete !!!');
  }

  onEdit(){

  }
}
