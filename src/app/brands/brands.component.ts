import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpServerService } from '../Services/http-server.service';
import { BrandsService } from './brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands = [
    { name: 'Gucci', ammount: '120', checked: false },
    { name: 'Addidas', ammount: '15', checked: false },
    { name: 'Nike', ammount: '35', checked: false },
    { name: 'Uniqlo', ammount: '89', checked: false },
    { name: 'Louis Vuiton', ammount: '30', checked: false },
  ]

  products$: any;
  products = [];

  constructor(private store: Store<{ products: any }>, private httpServerService: HttpServerService, private brandsService: BrandsService) {
    this.products$ = store.select('products');
  }

  onChecked(brand: any) {
    brand.checked = !brand.checked;
    let checkedBrand = [...this.brands].filter(brand => brand.checked == true);
    this.brandsService.setBrandFilter(checkedBrand)
  }

  ngOnInit(): void {
    this.httpServerService.getProducts().subscribe(data => {
      this.products = data
    });

  }
}
