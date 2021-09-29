import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpServerService } from '../Services/http-server.service';
import { Store } from '@ngrx/store';
import { updateProducts } from '../Actions/products.action';
import { Product } from './product.model';
import { BrandsService } from '../brands/brands.service';
import { ProductTypeService } from '../product-type/product-type.service';
import { PriceRangeService } from '../price-range/price-range.service';
import { Brand } from '../brands/brand.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})

export class ListProductComponent implements OnInit {

  view = true;
  products$!: Subscription;

  products: Array<Product> = [];
  rawProducts: Array<Product> = [];

  productTypeFilter = '';
  brandFilter = Array<Brand>();
  priceFilter = 0;

  constructor(private httpServerService: HttpServerService, private store: Store<{ products: Product }>, private brandsService: BrandsService, private productTypeService: ProductTypeService, private priceRangeService: PriceRangeService) {
    ;
  }

  public ngOnInit(): void {
    this.httpServerService.getProducts().subscribe(data => {
      this.rawProducts = data;
      this.store.dispatch(updateProducts({ products: this.rawProducts }));
    });
    this.products$ = this.store.select('products').subscribe(data => {
      this.products = data.products;
      this.view = data.isList;
    })
    this.productTypeService.asdata.subscribe(res => { this.productTypeFilter = res; this.filter(); });
    this.brandsService.asdata.subscribe(res => { this.brandFilter = res; this.filter(); });
    this.priceRangeService.asdata.subscribe(res => { this.priceFilter = res; this.filter(); })
  }

  public checkBrandFilter(brandName: string): boolean {
    if (this.brandFilter.length > 0) {
      return this.brandFilter.findIndex(d => d.name === brandName) > -1;
    }
    else return true;
  }

  public checkProductTypeFilter(productType: string): boolean {
    if (this.productTypeFilter !== '') {
      return this.productTypeFilter === productType;
    }
    else return true;
  }

  public checkPriceFilter(price: number): boolean {
    if (this.priceFilter > 0) {
      return this.priceFilter > price;
    }
    else return true;
  }

  public filter(): void {
    if (this.brandFilter.length === 0 && this.productTypeFilter === '' && this.priceFilter === 0) {
      this.store.dispatch(updateProducts({ products: this.rawProducts }));
    }
    else {
      this.products = this.rawProducts.filter((e: Product) =>
        this.checkBrandFilter(e.brand)
        &&
        this.checkPriceFilter(e.price)
        &&
        this.checkProductTypeFilter(e.type)
      );
    }
  }
}


