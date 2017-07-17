import {Injectable} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {AuthHttpService} from "../../helpers/auth-http.service";
import {Lot, Picture} from "./lots.model";
import {environment} from "../../../environments/environment";
import {Utils} from "../../helpers/utilities";
import {Response, RequestOptions, Headers, RequestMethod} from "@angular/http";

@Injectable()
export class LotsServiseService {

  lots: Lot[] = [];
  invokeEvent: Subject<any> = new Subject();

  constructor(private authService: AuthHttpService) {
  }

  dataChange() {
    this.invokeEvent.next();
  }

  getLots(pageNumber: number = 1): Observable<Lot[]> {
    return this.authService.get(`${environment.hostUrl}${Utils.lotsUrl}/page/${pageNumber}`).map(
      (inputData: Response) => {

        console.log(inputData.json());

        let lotsArray: Lot[] = [];
        let lotObj = (inputData.json()).objects;

        for (let i of lotObj) {
          lotsArray.push(new Lot(i));
        }

        this.lots = lotsArray;
        return lotsArray;
      }
    );
  }

  getCategoryById(id: number) {
    return this.authService.get(`${environment.hostUrl}${Utils.lotsUrl}${id}`).map(
      (inputData: Response) => {
        return inputData.json();
      }
    ).catch((error: Response) => {
      console.log(error);
      return Observable.throw(error);
    });
  }

  getDrafts(): Observable<Lot[]>{
    return this.authService.post(`${environment.hostUrl}${Utils.lotsUrl}get-drafts`, {}).map(
      (inputData: Response) => {

        console.log(inputData.json());

        let lotsArray: Lot[] = [];
        let lotObj = inputData.json();

        for (let i of lotObj) {
          lotsArray.push(new Lot(i));
        }

        this.lots = lotsArray;
        return lotsArray;
      }
    );
  }

  createLot(data: Lot): Observable<Lot> {

    // Input dta example
    // lot_data = dict(
    //             name='Lot',
    //             description='Lot description',
    //             category_id=child_id,
    //             count_participants=10,
    //             price=20.20
    //         )

    let urlString = environment.hostUrl + Utils.lotsUrl;

    return this.authService.post(urlString, data).map(
      (data: Response) => {
        this.dataChange();
        console.log(data.json());
        return new Lot(data.json());
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  addPicture(lot: Lot, picture: any): Observable<Picture>{
    let input = new FormData();

    if(picture.file){
      input.append("file", picture.file);
    }

    input.append("description", picture.description);

    let urlString = `${environment.hostUrl}${Utils.addPictureUrl}${lot.id}`;

    let headers = new Headers(
      {
        'Accept': '*/*'
      }
    );

    let options = new RequestOptions({headers: headers});
    options.body = input;
    options.url = urlString;
    options.method = RequestMethod.Post;

    return this.authService.post(urlString, input, options).map(
      (data: Response) => {
        this.dataChange();
        return new Picture(data.json());
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  deletePicture(picture: Picture): Observable<any>{
    let urlString = `${environment.hostUrl}${Utils.deletePictureUrl}${picture.id}`;

    return this.authService.delete(urlString).map(
      (data: Response) => {
        return data.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

}

//TODO edit lot, delete undelete lot, favorite, publish unpublish, getUsersLots, join lot
