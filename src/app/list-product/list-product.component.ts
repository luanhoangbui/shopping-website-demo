import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServerService } from '../Services/http-server.service';
import { Store } from '@ngrx/store';
import { increment, searchProducts } from '../Actions/products.action';
import { Products } from './product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})


export class ListProductComponent implements OnInit {

  view = true;
  products$: Observable<any>;

  products: Array<Products> = [];
  searchedProducts: Array<Products> = [];

  constructor(private httpServerService: HttpServerService, private store: Store<{ products: any }>) {
    this.products$ = store.select('products');
  }


  public ngOnInit(): void {
    this.httpServerService.getProducts().subscribe(data => {
      this.products = data;
      this.store.dispatch(searchProducts({ products: data, searchedProducts: data }));

    });
    this.products$.subscribe(data => {
      this.products = data.products;
      this.view = data.isList;
      this.searchedProducts = data.searchedProducts;
    })
  }


}
