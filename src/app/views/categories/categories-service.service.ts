import {Injectable} from '@angular/core';
import {AuthHttpService} from "../../helpers/auth-http.service";
import {Category} from "./categories.model";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {Utils} from "../../helpers/utilities";
import {Response, RequestOptionsArgs, RequestOptions, Headers, RequestMethod} from "@angular/http";


@Injectable()
export class CategoriesServiceService {

  invokeEvent: Subject<any> = new Subject();
  constructor(private authService: AuthHttpService) {
  }

  dataChange() {
    this.invokeEvent.next();
  }

   // private categories: Category[] = [];


  getCategories(): Observable<Category[]> {
    return this.authService.get(environment.hostUrl + Utils.categoriesUrl).map(
      (inputData: Response) => {

        let catArray: Category[] = [];
        let catObj = (inputData.json()).Categories;

        for (let i of catObj) {
          catArray.push(new Category(i));
        }
        // this.categories = catArray;
        return catArray;
      }
    );
  }
  getCategoryById(id: number) {
    return this.authService.get(environment.hostUrl + Utils.categoriesUrl + id).map(
      (inputData: Response) => {
        console.log(inputData.json());
        // let catArray: Category[] = [];
        // let catObj = (inputData.json()).Categories;
        //
        // for (let i of catObj) {
        //   catArray.push(new Category(i));
        // }
        return inputData.json();
      }
    ).catch((error: Response) => {
        console.log(error);
        return Observable.throw(error);
      });
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
        this.dataChange();
        return new Category(data.json());
      }
    ).catch((error: Response) => {
      console.log(error);
      return Observable.throw(error);
    });
  }

  updateCategory(newCategory: Category) {

     let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    );

    let options = new RequestOptions({headers: headers});
    options.body = newCategory;
    options.url = environment.hostUrl + Utils.categoriesUrl;
    options.method = RequestMethod.Post;

    return this.authService.put(environment.hostUrl + Utils.categoriesUrl + newCategory.id, newCategory,options).map(
      (data:Response)=>{
        this.dataChange();
        return new Category(data.json());
      }
    ).catch((error: Response) => {
      console.log(error);
      return Observable.throw(error);
    });


    // this.category[index] = newCategory;
    // this.categoryChanged.next(this.category.slice());
  }

  deleteCategory(index: number) {
    // this.category.splice(index, 1);
    // this.category.next(this.category.slice());
  }
}
