import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from './list-product/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  products$!: Subscription;
  products: Array<Product> = [];

  constructor(private store: Store<{ products: Product }>) { }

  ngOnInit(): void {
    this.products$ = this.store.select('products').subscribe(r => { this.products = r.products })
  }
}
