import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'lucky-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {

  constructor(
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onNewLot(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
