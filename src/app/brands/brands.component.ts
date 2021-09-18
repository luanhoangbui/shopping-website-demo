import { Component, OnInit } from '@angular/core';
import { Brands } from './brand.model';
import { BrandsService } from './brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands: Array<Brands> = [
    { name: 'Gucci', amount: 120, checked: false },
    { name: 'Addidas', amount: 15, checked: false },
    { name: 'Nike', amount: 35, checked: false },
    { name: 'Uniqlo', amount: 89, checked: false },
    { name: 'Louis Vuiton', amount: 30, checked: false },
  ]

  constructor(private brandsService: BrandsService) {

  }

  onChecked(brand: Brands) {
    brand.checked = !brand.checked;
    let checkedBrand = [...this.brands].filter(brand => brand.checked == true);
    this.brandsService.setBrandFilter(checkedBrand)
  }

  ngOnInit(): void {

  };

}

