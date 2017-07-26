import {Injectable} from '@angular/core';
import {AuthHttpService} from "../helpers/auth-http.service";
import {Category} from "../views/categories/categories.model";
import {Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {Utils} from "../helpers/utilities";
import {Response, RequestOptionsArgs, RequestOptions, Headers, RequestMethod} from "@angular/http";


@Injectable()
export class CategoriesService {

  invokeEvent: Subject<any> = new Subject();
  constructor(private authService: AuthHttpService) {
  }

  dataChange() {
    this.invokeEvent.next();
  }

  categories: Category[] = [];

  getCategories(): Observable<Category[]> {
    return this.authService.get(environment.hostUrl + Utils.categoriesUrl).map(
      (inputData: Response) => {

        let catArray: Category[] = [];
        let catObj = (inputData.json()).Categories;

        for (let i of catObj) {
          catArray.push(new Category(i));
        }

        this.categories = catArray;
        return catArray;
      }
    );
  }

  getCategoryById(id: number) {
    return this.authService.get(environment.hostUrl + Utils.categoriesUrl + id).map(
      (inputData: Response) => {
        return inputData.json();
      }
    ).catch((error: Response) => {
      console.log(error);
      return Observable.throw(error);
    });
  }

  createCategory(newCategoryData: {parent_id: string, file: any, name: string, description: string}): Observable<Category> {

    let input = new FormData();

    if(newCategoryData.file){
      input.append("file", newCategoryData.file);
    }

    input.append("name", newCategoryData.name);
    input.append("description", newCategoryData.description);

    let urlString = environment.hostUrl + Utils.categoriesUrl;
    if(newCategoryData.parent_id){
      urlString = urlString + `${newCategoryData.parent_id}`;
    }

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
        return new Category(data.json());
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  updateCategory(newCategoryData: {id: number, parent_id: number, file: any, name: string, description: string}): Observable<Category> {

    let input = new FormData();

    if(newCategoryData.file){
      input.append("file", newCategoryData.file);
    }

    input.append("parent_id", String(newCategoryData.parent_id));
    input.append("name", newCategoryData.name);
    input.append("description", newCategoryData.description);

    let urlString = environment.hostUrl + Utils.categoriesUrl + `${newCategoryData.id}`;

    let headers = new Headers({'Accept': '*/*'});

    let options = new RequestOptions({headers: headers});
    options.body = input;
    options.url = urlString;
    options.method = RequestMethod.Put;

    return this.authService.put(urlString, input, options).map(
      (data:Response)=>{
        this.dataChange();
        return new Category(data.json());
      }
    ).catch((error: Response) => {
      return Observable.throw(error);
    });

  }

  deleteCategory(categoryId: number) {
    let urlString = `${environment.hostUrl}${Utils.categoriesUrl}${categoryId}`;
    return this.authService.delete(urlString).map(
      (data)=>{
        this.dataChange();
        return data;
      }
    );
  }
}
