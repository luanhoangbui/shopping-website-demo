import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpServerService } from './http-server.service';
import { Products } from '../list-product/product.model';

describe('HttpServerService', () => {
  const API_SERVER_mock = 'http://localhost:3000'
  let service: HttpServerService;
  let httpTestingController: HttpTestingController;
  let httpServerServiceMock: any;
  let productsMock = [
    { "id": 1, "name": "Great product name goes here", "type": "shorts", "rating": 4, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 140, "brand": "Gucci", "imgLink": "https://static.dosi-in.com/images/detailed/111/dosiin-dkmv-dkmv-square-destroyed-jean-111354111354.jpeg" },
    { "id": 2, "name": "Great product name goes here", "type": "t-shirt", "rating": 3, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 150, "brand": "Uniqlo", "imgLink": "https://cdn.cliqueinc.com/posts/287554/cheap-summer-pieces-from-amazon-287554-1591125498603-main.700x0c.jpg" },
    { "id": 3, "name": "Great product name goes here", "type": "t-shirt", "rating": 4, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 160, "brand": "Nike", "imgLink": "https://images.wsj.net/im-269369?width=1280&size=1" },
    { "id": 4, "name": "Great product name goes here", "type": "t-shirt", "rating": 2, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 240, "brand": "Louis Vuiton", "imgLink": "https://ae01.alicdn.com/kf/Hd482a5bb302649ea865d256b997872a9f.jpg" },
    { "id": 5, "name": "Great product name goes here", "type": "skirt", "rating": 5, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 380, "brand": "Addidas", "imgLink": "https://ae01.alicdn.com/kf/H34f750e5aa7e45c7aa814c3c1d19e220R/Summer-Dresses-Women-Renaissance-Dress-Gathered-Dresses-Clothes-Square-Neck-Smocked-Waist-A-Line-Solid-Adjustable.jpeg_Q90.jpeg_.webp" },
    { "id": 6, "name": "Great product name goes here", "type": "shorts", "rating": 4, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 140, "brand": "Gucci", "imgLink": "https://static.dosi-in.com/images/detailed/111/dosiin-dkmv-dkmv-square-destroyed-jean-111354111354.jpeg" },
    { "id": 7, "name": "Great product name goes here", "type": "t-shirt", "rating": 3, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 150, "brand": "Uniqlo", "imgLink": "https://cdn.cliqueinc.com/posts/287554/cheap-summer-pieces-from-amazon-287554-1591125498603-main.700x0c.jpg" },
    { "id": 8, "name": "Great product name goes here", "type": "t-shirt", "rating": 4, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 160, "brand": "Nike", "imgLink": "https://images.wsj.net/im-269369?width=1280&size=1" },
    { "id": 9, "name": "Great product name goes here", "type": "t-shirt", "rating": 2, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 240, "brand": "Louis Vuiton", "imgLink": "https://ae01.alicdn.com/kf/Hd482a5bb302649ea865d256b997872a9f.jpg" },
    { "id": 10, "name": "Great product name goes here", "type": "skirt", "rating": 5, "description": "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.", "price": 380, "brand": "Addidas", "imgLink": "https://ae01.alicdn.com/kf/H34f750e5aa7e45c7aa814c3c1d19e220R/Summer-Dresses-Women-Renaissance-Dress-Gathered-Dresses-Clothes-Square-Neck-Smocked-Waist-A-Line-Solid-Adjustable.jpeg_Q90.jpeg_.webp" }
  ];
  beforeEach(() => {
    httpServerServiceMock = jasmine.createSpyObj('httpServerService', ['getProducts']);
    TestBed.configureTestingModule({
      providers: [
        HttpServerService,
        { provide: HttpServerService, useValue: httpServerServiceMock },
      ],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpServerService);
  });

  afterEach(() => {
    httpTestingController.verify()
  })


  // it('should have api url', () => {
  //   expect(httpServerServiceMock.API_SERVER).toEqual(API_SERVER_mock)
  // })

  it('should make a get call for getProducts', () => {
    const req = httpTestingController.expectOne('http://localhost:3000/products');
    service.getProducts().subscribe((res) => {
      expect(res).toEqual({ productsMock })
    });
    expect(req.request.method).toEqual('GET');
  });
});
