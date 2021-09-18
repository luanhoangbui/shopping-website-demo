import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Products } from '../list-product/product.model';
import { HttpServerService } from '../Services/http-server.service';
import { PriceRangeService } from './price-range.service';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.css']
})
export class PriceRangeComponent implements OnInit {

  price: number = 0;
  products$: Observable<Products>;
  products: Array<Products> = [];

  onSlider(event: any) {
    this.price = event.value;
    this.priceRangeService.setPriceFilter(this.price)
  };

  onInput(event: any) {
    this.price = event.target.value;
    this.priceRangeService.setPriceFilter(this.price)
  }

  constructor(private store: Store<{ products: Products }>, private httpServerService: HttpServerService, private priceRangeService: PriceRangeService) {
    this.products$ = store.select('products');
  }

  ngOnInit(): void {
    this.httpServerService.getProducts().subscribe(data => {
      this.products = data
    });
  }
}
