import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeView, orderLatest, orderNewest } from '../Actions/products.action';
import { Product } from '../list-product/product.model';

@Component({
  selector: 'app-view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.css']
})
export class ViewTypeComponent implements OnInit {

  constructor(private store: Store<{ products: Product }>) {
    this.products$ = store.select('products');
  }

  view = true;
  viewList() { this.store.dispatch(changeView({ view: true })) };
  viewGrid() { this.store.dispatch(changeView({ view: false })) };

  products$: Observable<Product>;
  products: Array<Product> = [];

  orderLatest() {
    this.store.dispatch(orderLatest());
  };
  orderNewest() {
    this.store.dispatch(orderNewest());
  };

  ngOnInit(): void {
    this.products$.subscribe(r => { this.products = r.products; console.log(r.products) })
  }

}
