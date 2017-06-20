import {Component, OnInit} from '@angular/core';
import {CategoriesServiceService} from "./categories-service.service";
import {Category} from "./categories.model";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'lucky-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  categories: Category[] = [];
  constructor(private catSrv: CategoriesServiceService, private router: Router, private route:ActivatedRoute) {
  }

  ngOnInit() {
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
