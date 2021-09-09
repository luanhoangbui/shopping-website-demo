import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { increment } from '../Actions/products.action';
import { HttpServerService } from '../Services/http-server.service';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.css']
})
export class PriceRangeComponent implements OnInit {

  price: number = 200;
  products$: Observable<any>;
  products = [];

  onSlider(event: any) {
    this.price = event.value;
    if (this.price === 0) {
      this.httpServerService.getProducts().subscribe(data => {
        this.products = data;
        this.store.dispatch(increment({ products: data }))
      });
    }
    else {
      this.httpServerService.filterProducts().pipe(map(data => data.filter((product: any) => product.price < this.price))).subscribe(data => { this.store.dispatch(increment({ products: data })) });
    }
  };

  onInput(event: any) {
    this.price = event.target.value;

    if ((event.target as HTMLInputElement).value === '') {
      this.httpServerService.getProducts().subscribe(data => {
        this.products = data;
        this.store.dispatch(increment({ products: data }))
      });
    }
    else {
      this.httpServerService.filterProducts().pipe(map(data => data.filter((product: any) => product.price < (event.target as HTMLInputElement).value))).subscribe(data => { this.store.dispatch(increment({ products: data })) });
    }
  }

  constructor(private store: Store<{ products: any }>, private httpServerService: HttpServerService) {
    this.products$ = store.select('products');
  }


  ngOnInit(): void {
    this.httpServerService.getProducts().subscribe(data => {
      this.products = data
    });
  }

}
