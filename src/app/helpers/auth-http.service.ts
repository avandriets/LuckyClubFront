import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, RequestOptions, RequestOptionsArgs, Response, RequestMethod, Request, Connection, ConnectionBackend} from '@angular/http';
import {Observable} from "rxjs";
import {Action} from "./services.model";

@Injectable()
export class AuthHttpService {

  process: EventEmitter<any> = new EventEmitter<any>();
  authFailed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _http: Http) {
  }

  private _buildAuthHeader(): string {
    return "Bearer " + localStorage.getItem("token");
  }

  public  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Get, url, null, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Post, url, body, options);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Put, url, body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Delete, url, null, options);
  }

  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Patch, url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Head, url, null, options);
  }

  private _request(method: RequestMethod, url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
    let requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: url,
      body: body
    }, options));

    if (!requestOptions.headers) {
      requestOptions.headers = new Headers();
    }

    requestOptions.headers.set("Authorization", this._buildAuthHeader());

    return Observable.create((observer) => {
      this.process.next(Action.QueryStart);
      this._http.request(new Request(requestOptions))
        // .map(res => res.json())
        .finally(() => {
          this.process.next(Action.QueryStop);
        })
        .subscribe(
          (res) => {
            observer.next(res);
            observer.complete();
          },
          (err) => {
            switch (err.status) {
              case 401:
                //intercept 401
                this.authFailed.next(err);
                observer.error(err);
                break;
              default:
                observer.error(err);
                break;
            }
          })
    })
  }
}
