import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Products } from './list-product/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'shopping-website';
  products$: Observable<any>;
  products: Array<Products> = [];

  constructor(private store: Store<{ products: any }>) {
    this.products$ = store.select('products');
  }
  ngOnInit(): void {
    // this.products$.pipe()
    this.products$.subscribe(r => { this.products = r.products })
  }
}
