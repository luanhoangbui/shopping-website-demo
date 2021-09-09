import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { increment, searchProducts } from '../Actions/products.action';
import { HttpServerService } from '../Services/http-server.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {
  panelOpenState = false;

  types = ['T-shirt', 'Skirt', 'Shorts', 'Jeans', 'Hat', 'Pijama', 'Sandals'];

  products$: Observable<any>;
  products = [];

  onInput(event: Event): any {

    if ((event.target as HTMLInputElement).value === '') {
      console.log('asfasdas')
      this.httpServerService.getProducts().subscribe(data => {
        this.products = data;
        this.store.dispatch(searchProducts({ products: data, searchedProducts: data }))
      });
    }
    else {
      this.httpServerService.filterProducts().pipe(map(data => data.filter((product: any) => product.type === (event.target as HTMLInputElement).value))).subscribe(data => { this.store.dispatch(searchProducts({ products: data, searchedProducts: data })) });
    }
  }

  constructor(private store: Store<{ products: any }>, private httpServerService: HttpServerService) {
    this.products$ = store.select('products');
  }

  onChecked(brand: any) {

  }

  ngOnInit(): void {
    this.httpServerService.getProducts().subscribe(data => {
      console.log('sfasdasd')
      this.products = data
    });
  }

}
