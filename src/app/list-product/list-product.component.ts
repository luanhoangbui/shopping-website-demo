import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServerService } from '../Services/http-server.service';
import { Store } from '@ngrx/store';
import { updateProducts } from '../Actions/products.action';
import { Products } from './product.model';
import { BrandsService } from '../brands/brands.service';
import { ProductTypeService } from '../product-type/product-type.service';
import { map } from 'rxjs/operators';
import { PriceRangeService } from '../price-range/price-range.service';
import { Brands } from '../brands/brand.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})

export class ListProductComponent implements OnInit {

  view = true;
  products$: Observable<Products>;

  products: Array<Products> = [];

  productTypeFilter = '';
  brandFilter = Array<Brands>();
  priceFilter = 0;

  constructor(private httpServerService: HttpServerService, private store: Store<{ products: Products }>, private brandsService: BrandsService, private productTypeService: ProductTypeService, private priceRangeService: PriceRangeService) {
    this.products$ = store.select('products');
  }

  public ngOnInit(): void {
    this.products$.subscribe(data => {
      this.products = data.products;
      this.view = data.isList;
    })
    this.productTypeService.asdata.subscribe(res => { this.productTypeFilter = res; this.filter(); });
    this.brandsService.asdata.subscribe(res => { this.brandFilter = res; this.filter(); });
    this.priceRangeService.asdata.subscribe(res => { this.priceFilter = res; this.filter(); })
  }

  public filter(): void {
    let result: [];
    if (this.brandFilter.length === 0 && this.productTypeFilter == '' && this.priceFilter === 0) {
      this.httpServerService.getProducts().subscribe(data => {
        this.store.dispatch(updateProducts({ products: data }));
      });
    }
    else {
      this.httpServerService.getProducts().pipe(map(data => data.filter((e: Products) =>
        (this.brandFilter.length > 0 ? this.brandFilter.some(ele => ele.name === e.brand) : true) &&
        (this.productTypeFilter !== '' ? this.productTypeFilter === e.type : true) &&
        (this.priceFilter > 0 ? this.priceFilter > e.price : true)))).subscribe(res => {
          this.store.dispatch(updateProducts({ products: res }));
        })
    }
  }

}
