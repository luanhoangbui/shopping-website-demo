import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
  private API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public getProducts(): Observable<any> {
    const url = `${this.API_SERVER}/products`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public filterProducts(): Observable<any> {
    const url = `${this.API_SERVER}/products`;
    return this.httpClient.get<any>(url, this.httpOptions);

  }
}
