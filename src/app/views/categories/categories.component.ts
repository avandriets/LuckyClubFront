import {Component, OnInit} from '@angular/core';
import {CategoriesServiceService} from "./categories-service.service";
import {Category, CategoriesCollection} from "./categories.model";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'lucky-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoriesCollection: CategoriesCollection = new CategoriesCollection();

  constructor(private catSrv: CategoriesServiceService,
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
        console.log(data);
      }
    );
  }

  getParentCategories(): Category[]{
    return this.categoriesCollection.getParentCategories();
  }

  getSubCategories(category: Category): Category[]{
    return this.categoriesCollection.getChildrenCategories(category);
  }

  onNewCategory(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
