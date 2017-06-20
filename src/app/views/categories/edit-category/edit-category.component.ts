import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {CategoriesServiceService} from "../categories-service.service";

@Component({
  selector: 'lucky-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  id: number = null;
  name: string = "";
  description: string = "";

  constructor(private route: ActivatedRoute,
              private categoriesServiceService: CategoriesServiceService) { }

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = +params['id'];
    //     this.categoriesServiceService.getCategoryById( +params['id'] )
    //       .subscribe(
    //         (data) => {
    //           console.log('data:' + data);
    //           //console.log('data.id:' + data.id);
    //           //console.log('data.description:' + data.description);
    //
    //           //this.name = data.name;
    //           //this.description = data.description;
    //         //  this.id = data.id;
    //         //  this.name = data.name;
    //
    //         },
    //         (error) => {
    //           console.log(error);
    //         }
    //       );
    //     // console.log(this.id);
    //     // console.log(this.categorie);
    //   }
    // );
  }

}
