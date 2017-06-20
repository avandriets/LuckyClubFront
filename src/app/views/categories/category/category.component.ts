import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
  selector: 'lucky-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  id: number = null;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
  }

  onEditCategory() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCategory() {
    console.log('Delete !!!');
  }

}
