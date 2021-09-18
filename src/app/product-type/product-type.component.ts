import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Products } from '../list-product/product.model';
import { HttpServerService } from '../Services/http-server.service';
import { ProductTypeService } from './product-type.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {
  panelOpenState = false;

  types = ['T-shirt', 'Skirt', 'Shorts', 'Jeans', 'Hat', 'Pijama', 'Sandals'];

  products$: Observable<Products>;
  products: Array<Products> = [];

  onInput(event: Event) {
    this.productTypeService.setProductFilter((event.target as HTMLInputElement).value)
  }

  constructor(private store: Store<{ products: Products }>, private httpServerService: HttpServerService, private productTypeService: ProductTypeService) {
    this.products$ = store.select('products');
  }

  ngOnInit(): void {
    this.httpServerService.getProducts().subscribe(data => {
      this.products = data
    });
  }

}
