import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../list-product/product.model';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    const url = `http://localhost:3000/products`;
    return this.httpClient.get<Product[]>(url);
  }
}
