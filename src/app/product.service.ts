import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Product } from "./product.model";
//import RxJs required methods
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class ProductService {
    constructor (private http: Http) {}
    //private instance variable to hold base url
    private productsUrl = "http://localhost/WebApiApp/api/products";

    //Code from 1.19 DELETE
    deleteProduct(product: Product) : Observable<any> {
        return this.http.delete(`${this.productsUrl}/${product.Id}`)
            .map(this.mapResponseStatus).catch(this.onError);
    }

    //Code from 1.20 GET
    getProducts() : Observable<Product[]> {
        return this.http.get(this.productsUrl)
            .map((res:Response) => res.json())
            .catch(this.onError);
    }

    //Code from 1.21 PUT
    addEditProduct(product: Product) : Observable<Product> {
      return this.http.put(`${this.productsUrl}/${product.Id}`, product)
        .map(resp => resp.json()).catch(this.onError);
    }

    //Code from 1.22 POST
    addProduct(product: Product) : Observable<Product> {
      return this.http.post(this.productsUrl, product)
        .map(resp => resp.json())
        .catch(this.onError);
    }

    mapResponseStatus(resp: any): any {
    return {
      status: resp.status,
      statusText: resp.statusText,
      ok: resp.ok
    };
  }
  
  onError(resp: any): Observable<any> {
    let msg = resp.status + ":" + resp.statusText;
    console.log(msg);
	  return Observable.throw(msg);
  }
}