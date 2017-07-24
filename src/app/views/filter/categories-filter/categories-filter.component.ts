import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../../services/categories-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Category, CategoriesCollection} from "../../categories/categories.model";

@Component({
  selector: 'lucky-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.scss']
})
export class CategoriesFilterComponent implements OnInit {

  categoriesCollection: CategoriesCollection = new CategoriesCollection();

  constructor(private catSrv: CategoriesService,
              private router: Router,
              private route:ActivatedRoute) {
    this.catSrv.invokeEvent.subscribe(() => this.getDataFromServer());
  }

  ngOnInit() {
    this.getDataFromServer();
  }
  getDataFromServer(){
    this.catSrv.getCategories().subscribe(
      (data:Category[])=>{
        this.categoriesCollection = new CategoriesCollection(data);
      }
    );
  }

  getParentCategories(): Category[]{
    return this.categoriesCollection.getParentCategories();
  }

  getSubCategories(category: Category): Category[]{
    return this.categoriesCollection.getChildrenCategories(category);
  }
}
