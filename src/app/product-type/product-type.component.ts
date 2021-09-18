import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from './product-type.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {


  types = ['T-shirt', 'Skirt', 'Shorts', 'Jeans', 'Hat', 'Pijama', 'Sandals'];


  onInput(event: any) {
    this.productTypeService.setProductFilter(event.target.value)
  }

  constructor(private productTypeService: ProductTypeService) { }

  ngOnInit(): void { }

}
