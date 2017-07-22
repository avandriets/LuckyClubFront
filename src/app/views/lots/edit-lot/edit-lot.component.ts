import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute, Router} from "@angular/router";
import {LotsServiseService} from "../lots-servise.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Lot, Picture} from "../lots.model";
import {CategoriesService} from "../../categories/categories-service.service";
import {CategoriesCollection, Category} from "../../categories/categories.model";

@Component({
  selector: 'lucky-edit-lot',
  templateUrl: './edit-lot.component.html',
  styleUrls: ['./edit-lot.component.scss']
})
export class EditLotComponent implements OnInit {
  id: number = null;
  lot: Lot = null;
  lotEditFG: FormGroup = null;
  lotImgFG: FormGroup = null;
  file:any = null;
  private fileToShow: any;

  private categoriesList: Category[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private lotSrv: LotsServiseService,
              private carSrv: CategoriesService
  ) {

    this.lotEditFG = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      category_id: new FormControl(null, Validators.required),
      count_participants: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });

    this.lotImgFG = new FormGroup({
      imageFile: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });

  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];

        this.carSrv.getCategories().subscribe(
          (categories: Category[]) => {

            this.categoriesList = new CategoriesCollection(categories).getParentCategories();

            this.lotSrv.getLotByIdForAdmin(this.id)
              .subscribe(
                (data) => {

                  this.lot = data;

                  this.lotEditFG.patchValue(
                    {
                      name: data.name,
                      description: data.description,
                      category_id: data.category_id,
                      count_participants: data.count_participants,
                      price: data.price
                    }
                  );
                },
                (error) => {
                  console.log(error);
                }
              );

          }
        );
      }
    );

  }

  onSubmit() {
    let data: Lot = new Lot();
    data.id = this.id;
    data.name = this.lotEditFG.get('name').value;
    data.description = this.lotEditFG.get('description').value;
    data.category_id = this.lotEditFG.get('category_id').value;
    data.count_participants = this.lotEditFG.get('count_participants').value;
    data.price = this.lotEditFG.get('price').value;

    this.lotSrv.updateLot(data).subscribe(
      (outputData: Lot) => {
        this.router.navigate([`../`], {relativeTo: this.route});
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onCancel1112() {
   //this.router.navigate(['admin-lots/admin-lots', this.id]);
    console.log("dfe");
  }

  onFileChange(e) {
    let upFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    if(!upFile){
      return;
    }

    let pattern = /image-*/;
    let reader = new FileReader();

    if (!upFile.type.match(pattern)) {
      alert('invalid format');
      this.lotImgFG.get('imageFile').setValue('');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(upFile);
    this.file = upFile;
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.fileToShow = reader.result;
  }

  onImageClear(){
    this.file = null;
    this.lotImgFG.get('imageFile').setValue(null);
  }

  onSubmitImage(){
    let data = {
      description: this.lotImgFG.get('description').value,
      file: this.file
    };

    this.lotSrv.addPicture(this.lot, data).subscribe(
      (outputData: Picture) => {
        // this.router.navigate([`../${outputData.id}`], {relativeTo:this.route});
        // console.log(outputData);
      },
      (error) =>{
        console.log(error)
      }
    );
  }

}
