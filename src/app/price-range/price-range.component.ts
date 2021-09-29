import { Component, OnInit } from '@angular/core';
import { PriceRangeService } from './price-range.service';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.css']
})
export class PriceRangeComponent implements OnInit {

  price: number = 0;


  onSlide(event: any) {
    this.price = event.value;
    this.priceRangeService.setPriceFilter(this.price)
  };

  onInput(event: any) {
    this.price = event.target.value;
    this.priceRangeService.setPriceFilter(this.price)
  }

  constructor(private priceRangeService: PriceRangeService) { }

  ngOnInit(): void { }
}
