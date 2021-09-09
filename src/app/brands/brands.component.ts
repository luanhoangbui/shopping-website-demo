import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { cacheIncrement, increment, searchProducts } from '../Actions/products.action';
import { HttpServerService } from '../Services/http-server.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands = [
    { name: 'Gucci', ammount: '120', checked: false },
    { name: 'Addidas', ammount: '15', checked: false },
    { name: 'Nike', ammount: '35', checked: false },
    { name: 'Uniqlo', ammount: '89', checked: false },
    { name: 'Louis Vuiton', ammount: '30', checked: false },
  ]

  products$: any;
  searchedProducts$: Observable<any>;
  products = [];
  searchedProducts = [];
  constructor(private store: Store<{ products: any, searchedProducts: any }>, private httpServerService: HttpServerService) {
    this.products$ = store.select('products').subscribe(state => { this.searchedProducts = state.searchedProducts });
    this.searchedProducts$ = store.select('searchedProducts');

  }

  onChecked(brand: any) {
    brand.checked = !brand.checked;
    let checkedBrand = [...this.brands].filter(brand => brand.checked == true);
    if (checkedBrand.length == 0) {
      this.httpServerService.getProducts().subscribe(data => {
        this.products = data;
        this.store.dispatch(increment({ products: data }))
      });
    }
    else {
      let tempData = [] as any[];
      from(this.searchedProducts as any[]).pipe(filter(data => { return checkedBrand.some(e => e.name === data.brand) })).subscribe(data => { tempData.push(data); });
      this.store.dispatch(increment({ products: tempData }))
    }
  }

  ngOnInit(): void {
    this.httpServerService.getProducts().subscribe(data => {
      this.products = data
    });
  }
}
