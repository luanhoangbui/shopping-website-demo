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

  constructor(private store: Store<{ products: Products }>) {
    this.products$ = store.select('products');
  }

  view = true;
  onList() { this.store.dispatch(changeView({ view: true })) };
  onGrid() { this.store.dispatch(changeView({ view: false })) };

  products$: Observable<Products>;
  products: Array<Products> = [];

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
