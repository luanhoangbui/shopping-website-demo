import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServerService } from '../Services/http-server.service';
import { Store } from '@ngrx/store';
import { increment, reset } from '../counter.action';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})


export class ListProductComponent implements OnInit {

  products$: Observable<any>;

  products = [
    {id : 1, name: 'Great product name goes here', rating: 4 ,description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 140, brand: 'Gucci', imgLink: 'https://static.dosi-in.com/images/detailed/111/dosiin-dkmv-dkmv-square-destroyed-jean-111354111354.jpeg'}
  ];

  constructor( private httpServerService: HttpServerService, private store: Store<{ products: any }>) { 
    this.products$ = store.select('products');
  }


  public ngOnInit(): void {
    
    this.httpServerService.getProducts().subscribe(data => {
      this.products = data;
      this.store.dispatch(increment({products : data}));
      console.log(data)
    });
    console.log(this.products$)
  }

  
}
