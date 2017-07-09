import {Component, OnInit} from '@angular/core';
import {CategoriesServiceService} from "./categories-service.service";
import {Category} from "./categories.model";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'lucky-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  categories: Category[] = [];
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
        this.categories = data;
      }
    );
  }

  onNewCategory(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
