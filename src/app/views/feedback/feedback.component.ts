import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'lucky-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup = null;

  constructor() {
    this.feedbackForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
  }
  onSubmit(){
    console.log('обратная связь');
  }
}
