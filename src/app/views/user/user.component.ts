import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {Users, LoginStatusEnum} from "../../auth/auth.model";
import {AuthService} from "../../services/auth.service";
import {LotsServiseService} from "../../services/lots-servise.service";
import {Lot} from "../lots/lots.model";
import {Subscription} from "rxjs";
import {FormControl, Validators, FormGroup} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";


@Component({
  selector: 'lucky-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {

    if(this.authStatusSubscription)
      this.authStatusSubscription.unsubscribe();

    if(this.subscription)
      this.subscription.unsubscribe();
  }

  currentUser: Users = null;

  id: number = 0;
  user_lots: Lot[] = [];
  favorite_lots: Lot[] = [];

  file: any = null;
  fileToShow: any;
  iFile;

  private authStatusSubscription: Subscription;
  private subscription: Subscription;
  UserEditFG: FormGroup = null;

  constructor(private lotSrv: LotsServiseService,
              private authSrv: AuthService,
              // private changeDetection: ChangeDetectorRef,
              private domSanitizer: DomSanitizer,
              private router: Router) {
    this.createForm();
  }


  createForm() {

    this.UserEditFG = new FormGroup({
      imageFile: new FormControl(null),
      imageFile2: new FormControl(null),
      email: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      nikName: new FormControl(null, Validators.required),
      bankCard: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.subscription = this.lotSrv.invokeEvent
      .subscribe(
        () => {
          this.getData();
        }
      );

    this.authStatusSubscription = this.authSrv.invokeEvent.subscribe(
      (statusValue: LoginStatusEnum) => {
        this.getData();
        if (statusValue == LoginStatusEnum.LoggedOut) {
          this.router.navigate([`main`]);
        }
      }
    );

    this.getData();
  }

  initValues() {
    this.UserEditFG.patchValue(
      {
        // imageFile: this.currentUser.photo_url,
        firstName: this.currentUser.first_name,
        lastName: this.currentUser.last_name,
        nikName: this.currentUser.screen_name,
        email: this.currentUser.email,
        bankCard: this.currentUser.bank_card,
        phoneNumber: this.currentUser.phone
      }
    );
    this.fileToShow = this.currentUser.photo_url;
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
    this.UserEditFG.get('imageFile2').setValue(null);

    this.iFile = '';
  }

  getData() {

    this.lotSrv.getUserLots().subscribe(
      (data: Lot[]) => {
        this.user_lots = data;
      }
    );

    this.lotSrv.getFavorites().subscribe(
      (data: Lot[]) => {
        this.favorite_lots = data;
        // this.changeDetection.detectChanges();
      },
      (error) => {
        this.favorite_lots = [];
      }
    );

    this.authSrv.getUserInfoFromServer().subscribe(
      (user: Users) => {
        // console.log(user);
        this.currentUser = user;
        this.initValues();
      }
    );

  }

  onMoreRecommend() {
    console.log('onMoreRecommend');
  }

  onMoreFavorite(){
    console.log('onMoreFavorite');
  }

  onSubmit(){

   let data = {
      file: this.file,
      first_name: this.UserEditFG.get('firstName').value,
      last_name: this.UserEditFG.get('lastName').value,
      screen_name: this.UserEditFG.get('nikName').value,
      email: this.UserEditFG.get('email').value,
      bank_card: this.UserEditFG.get('bankCard').value,
      phone: this.UserEditFG.get('phoneNumber').value
    };

    this.authSrv.updateProfile(data).subscribe(
      (user: Users) => {
        this.currentUser = user;
        this.initValues();
      },
      (error) =>{
        console.log(error)
      }
    );

  }

  onCancel(){
    this.initValues();
  }
}
