import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeView, orderLatest, orderNewest } from '../Actions/products.action';
import { Products } from '../list-product/product.model';

@Component({
  selector: 'app-view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.css']
})
export class ViewTypeComponent implements OnInit {

  view = true;
  onList() { this.store.dispatch(changeView({ view: true })) };
  onGrid() { this.store.dispatch(changeView({ view: false })) };

  products$: Observable<any>;

  products: Array<Products> = [];

  constructor(private store: Store<{ products: Products }>) {
    this.products$ = store.select('products');
  }

  onLatest() {
    this.store.dispatch(orderLatest());
  };
  onNewest() {
    this.store.dispatch(orderNewest());
  };

  ngOnInit(): void {
    this.products$.subscribe(r => { this.products = r.products })
  }

}
