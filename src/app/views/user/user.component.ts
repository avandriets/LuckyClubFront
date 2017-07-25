import {Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import {Users, LoginStatusEnum} from "../../auth/auth.model";
import {AuthService} from "../../services/auth.service";
import {LotsServiseService} from "../../services/lots-servise.service";
import {Lot} from "../lots/lots.model";
import {Subscription} from "rxjs";
import {FormControl, Validators, FormGroup} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'lucky-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  currentUser: Users = null;

  id: number = 0;
  recommend_lots: Lot[] = [];
  favorite_lots: Lot[] = [];

  file: any = null;
  private fileToShow: any;
  iFile;

  private authStatusSubscription: Subscription;
  private subscription: Subscription;
  private UserEditFG: FormGroup = null;

  constructor(private lotSrv: LotsServiseService,
              private authSrv: AuthService,
              private changeDetection: ChangeDetectorRef,
              private domSanitizer: DomSanitizer) {
    this.createForm();
  }

  createForm() {

    this.UserEditFG = new FormGroup({
      imageFile: new FormControl(null),
      email: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      nikName: new FormControl(null, Validators.required),
      bankCard: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.currentUser = this.authSrv.getCurrentUser();


    this.subscription = this.lotSrv.invokeEvent
      .subscribe(
        () => {
          this.getData();
        }
      );

    this.authStatusSubscription = this.authSrv.invokeEvent.subscribe(
      (statusValue: LoginStatusEnum) => {
        this.getData();
      }
    );

    this.getData();
  }

  initValues() {
    this.UserEditFG.patchValue(
      {
        imageFile: this.currentUser.photo_url,
        firstName: this.currentUser.first_name,
        lastName: this.currentUser.last_name,
        nikName: this.currentUser.screen_name,
        email: '',
        bankCard: '',
        phoneNumber: ''
      }
    );
  }

  onFileChange(e) {
    let upFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    if (!upFile) {
      return;
    }

    let pattern = /image-*/;
    let reader = new FileReader();

    if (!upFile.type.match(pattern)) {
      alert('invalid format');
      this.UserEditFG.get('imageFile').setValue('');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(upFile);
    this.file = upFile;

    this.iFile = this.file;
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.fileToShow = reader.result;
  }

  onImageClear() {
    this.file = null;
    this.fileToShow = "";
    this.UserEditFG.get('imageFile').setValue(null);
    this.iFile = '';
  }

  getData() {

    this.lotSrv.getRecommend().subscribe(
      (data: Lot[]) => {
        this.recommend_lots = data;
      }
    );

    this.lotSrv.getFavorites().subscribe(
      (data: Lot[]) => {
        this.favorite_lots = data;
        this.changeDetection.detectChanges();
      },
      (error) => {
        this.favorite_lots = [];
      }
    );

    this.initValues();
  }

  onMoreRecommend() {
    console.log('onMoreRecommend');
  }

  onMoreFavorite(){
    console.log('onMoreFavorite');
  }

  onSubmit(){

    // let data: Lot = new Lot();
    // data.id = this.id;
    // data.name = this.lotEditFG.get('name').value;
    // data.description = this.lotEditFG.get('description').value;
    // data.full_description = this.lotEditFG.get('full_description').value;
    // data.category_id = this.lotEditFG.get('category_id').value;
    // data.count_participants = this.lotEditFG.get('count_participants').value;
    // data.price = this.lotEditFG.get('price').value;
    //
    // this.lotSrv.updateLot(data).subscribe(
    //   (outputData: Lot) => {
    //     this.router.navigate([`../`], {relativeTo: this.route});
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // );

  }

  onCancel(){
    this.initValues();
  }
}
