import {Injectable} from '@angular/core';
import {AuthHttpService} from "../../helpers/auth-http.service";
import {Category} from "./categories.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Utils} from "../../helpers/utilities";
import {Response, RequestOptionsArgs, RequestOptions, Headers, RequestMethod} from "@angular/http";


@Injectable()
export class CategoriesServiceService {

  constructor(private authService: AuthHttpService) {
  }

  getCategories(): Observable<Category[]> {
    return this.authService.get(environment.hostUrl + Utils.categoriesUrl).map(
      (inputData: Response) => {

        let catArray: Category[] = [];
        let catObj = (inputData.json()).Categories;

        for (let i of catObj) {
          catArray.push(new Category(i));
        }
        return catArray;
      }
    );
  }

  createCategory(newCategoryData): Observable<Category> {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    );

    let options = new RequestOptions({headers: headers});
    options.body = newCategoryData;
    options.url = environment.hostUrl + Utils.categoriesUrl;
    options.method = RequestMethod.Post;

    return this.authService.post(environment.hostUrl + Utils.categoriesUrl, newCategoryData,options).map(
      (data:Response)=>{
        return new Category(data.json());
      }
    ).catch((error: Response) => {
      console.log(error);
      return Observable.throw(error);
    });
  }
}
