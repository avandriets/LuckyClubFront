import {Injectable} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {AuthHttpService} from "../helpers/auth-http.service";
import {Lot, Picture} from "../views/lots/lots.model";
import {environment} from "../../environments/environment";
import {Utils} from "../helpers/utilities";
import {Response, RequestOptions, Headers, RequestMethod, URLSearchParams} from "@angular/http";

@Injectable()
export class LotsServiseService {

  lots: Lot[] = [];
  invokeEvent: Subject<any> = new Subject();
  private lotsRecommend: Lot[] = [];
  private lotsFavorite: Lot[] = [];

  constructor(private authService: AuthHttpService) {
  }

  dataChange() {
    this.invokeEvent.next();
  }

  isLotFavorite(lot: Lot): boolean{
    for(let i of this.lotsFavorite){
      if (i.id === lot.id) {
        return true;
      }
    }

    return false;
  }

  getLotByIdForAdmin(id: number): Observable<Lot> {
    return this.authService.post(`${environment.hostUrl}${Utils.lotsUrl}${id}`, {}).map(
      (inputData: Response) => {
        return new Lot(inputData.json());
      }
    ).catch((error: Response) => {
      console.log(error);
      return Observable.throw(error);
    });
  }

  getLotByIdForUser(id: number) {
    return this.authService.get(`${environment.hostUrl}${Utils.lotsUrl}${id}`, {}).map(
      (inputData: Response) => {
        return new Lot(inputData.json());
      }
    ).catch((error: Response) => {
      console.log(error);
      return Observable.throw(error);
    });
  }

  getLots(category?: string): Observable<Lot[]> {

    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    );

    let options = new RequestOptions({headers: headers});
    options.url = `${environment.hostUrl}${Utils.lotsUrl}`;
    options.method = RequestMethod.Get;

    let params: URLSearchParams = new URLSearchParams();
    params.set('per_page', '200');

    if (category) {
      params.set('category', category);
    }
    options.params = params;

    return this.authService.get(`${environment.hostUrl}${Utils.lotsUrl}`, options).map(
      (inputData: Response) => {

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

  getFavorites(): Observable<Lot[]> {
    return this.authService.get(`${environment.hostUrl}${Utils.lotsUrl}get-favorites`).map(
      (inputData: Response) => {
        let lotsArray: Lot[] = [];
        let lotObj = inputData.json();

        for (let i of lotObj.objects) {
          lotsArray.push(new Lot(i));
        }

        this.lotsFavorite = lotsArray;

        return lotsArray;
      }
    ).catch((error: Response) => {
      this.lotsFavorite = [];
      return Observable.throw(error);
    });
  }

  getRecommend(): Observable<Lot[]> {
    return this.authService.get(`${environment.hostUrl}${Utils.lotsUrl}get-recommend`).map(
      (inputData: Response) => {

        let lotsArray: Lot[] = [];
        let lotObj = inputData.json();

        for (let i of lotObj) {
          lotsArray.push(new Lot(i));
        }

        this.lotsRecommend = lotsArray;
        return lotsArray;
      }
    );
  }

  getDrafts(): Observable<Lot[]>{
    return this.authService.post(`${environment.hostUrl}${Utils.lotsUrl}get-drafts`, {}).map(
      (inputData: Response) => {

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

  getDeleted(): Observable<Lot[]>{
    return this.authService.post(`${environment.hostUrl}${Utils.lotsUrl}get-deleted`, {}).map(
      (inputData: Response) => {

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

    let urlString = environment.hostUrl + Utils.lotsUrl;

    return this.authService.post(urlString, data).map(
      (data: Response) => {
        this.dataChange();
        return new Lot(data.json());
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  addPicture(lot: Lot, pictureData: {description: string, file: any}): Observable<Picture>{
    let input = new FormData();

    if(pictureData.file){
      input.append('file', pictureData.file);
    }

    input.append('description', pictureData.description);

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
        this.dataChange();
        return data.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  updateLot(editedLot: Lot): Observable<Lot> {
    let urlString = `${environment.hostUrl}${Utils.lotsUrl}${editedLot.id}`;

    return this.authService.put(urlString, editedLot).map(
      (data: Response) => {
        this.dataChange();
        return new Lot(data.json());
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  deleteLot(id: number): Observable<any> {
    let urlString = `${environment.hostUrl}${Utils.lotsUrl}${id}`;

    return this.authService.delete(urlString).map(
      (data: Response) => {
        const retData = data.json();
        this.dataChange();
        return retData.success;
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  unDeleteLot(id: number): Observable<any> {
    let urlString = `${environment.hostUrl}${Utils.lotsUrl}${id}/undelete`;

    return this.authService.post(urlString, {}).map(
      (data: Response) => {
        this.dataChange();
        return data.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  publishLot(id: number): Observable<any> {
    let urlString = `${environment.hostUrl}${Utils.lotsUrl}${id}/publish-lot`;

    return this.authService.post(urlString, {}).map(
      (data: Response) => {
        this.dataChange();
        return data.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  unPublishLot(id: number): Observable<any> {
    let urlString = `${environment.hostUrl}${Utils.lotsUrl}${id}/un-publish-lot`;

    return this.authService.post(urlString, {}).map(
      (data: Response) => {
        this.dataChange();
        return data.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  recommendedLot(id: number): Observable<any> {
    let urlString = `${environment.hostUrl}${Utils.lotsUrl}${id}/set-recommend`;

    return this.authService.post(urlString, {}).map(
      (data: Response) => {
        this.dataChange();
        return data.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  joinLot(id: number): Observable<any>{
    let urlString = `${environment.hostUrl}${Utils.lotsUrl}${id}/join-lot`;

    return this.authService.post(urlString, {}).map(
      (data: Response) => {
        return data.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  leaveLot(id: number): Observable<any>{
    let urlString = `${environment.hostUrl}${Utils.lotsUrl}${id}/leave-lot`;

    return this.authService.post(urlString, {}).map(
      (data: Response) => {
        return data.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  setFavorite(id: number): Observable<any>{
    let urlString = `${environment.hostUrl}${Utils.lotsUrl}${id}/set-favorite`;

    return this.authService.post(urlString, {}).map(
      (data: Response) => {
        this.dataChange();
        return data.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  getUserLots(): Observable<Lot[]>{
    return this.authService.post(`${environment.hostUrl}${Utils.lotsUrl}users_lot`, {}).map(
      (inputData: Response) => {

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

}

