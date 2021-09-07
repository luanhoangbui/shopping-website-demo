import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands = [
    {name:'Mercedes', ammount:'120'},
    {name:'Honda', ammount:'15'},
    {name:'Toyota', ammount:'35'},
    {name:'Nissan', ammount:'89'},
    {name:'Mitsubishi', ammount:'30'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
