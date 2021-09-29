import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProductComponent } from './list-product.component';
import { BrandsService } from '../brands/brands.service';
import { ProductTypeService } from '../product-type/product-type.service';
import { PriceRangeService } from '../price-range/price-range.service';
import { StoreModule } from '@ngrx/store';
import { productReducer } from '../Reducers/products.reducer';
import { Brand } from '../brands/brand.model';
import { of } from 'rxjs';
import { HttpServerService } from '../Services/http-server.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Product } from './product.model';
import { updateProducts } from '../Actions/products.action';

describe('ListProductComponent', () => {

    let httpService: HttpServerService;
    let httpTestingController: HttpTestingController;
    const price = 0;
    const brandsMock: Array<Brand> = [
        { name: 'Gucci', amount: 120, checked: false },
        { name: 'Addidas', amount: 15, checked: false },
        { name: 'Nike', amount: 35, checked: false },
        { name: 'Uniqlo', amount: 89, checked: false },
        { name: 'Louis Vuiton', amount: 30, checked: false },
    ];
    const type = 'shorts';
    let productsMock = [
        { id: 1, name: 'Great product name goes here', type: "shorts", rating: 4, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 140, brand: 'Gucci', imgLink: 'https://static.dosi-in.com/images/detailed/111/dosiin-dkmv-dkmv-square-destroyed-jean-111354111354.jpeg' },
        { id: 2, name: 'Great product name goes here', type: "t-shirt", rating: 3, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 150, brand: 'Uniqlo', imgLink: 'https://cdn.cliqueinc.com/posts/287554/cheap-summer-pieces-from-amazon-287554-1591125498603-main.700x0c.jpg' },
        { id: 3, name: 'Great product name goes here', type: "t-shirt", rating: 4, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 160, brand: 'Nike', imgLink: 'https://images.wsj.net/im-269369?width=1280&size=1' },
        { id: 4, name: 'Great product name goes here', type: "t-shirt", rating: 2, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 240, brand: 'Louis Vuiton', imgLink: 'https://ae01.alicdn.com/kf/Hd482a5bb302649ea865d256b997872a9f.jpg' },
        { id: 5, name: 'Great product name goes here', type: "skirt", rating: 5, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 380, brand: 'Addidas', imgLink: 'https://ae01.alicdn.com/kf/H34f750e5aa7e45c7aa814c3c1d19e220R/Summer-Dresses-Women-Renaissance-Dress-Gathered-Dresses-Clothes-Square-Neck-Smocked-Waist-A-Line-Solid-Adjustable.jpeg_Q90.jpeg_.webp' },
        { id: 6, name: 'Great product name goes here', type: "shorts", rating: 4, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 140, brand: 'Gucci', imgLink: 'https://static.dosi-in.com/images/detailed/111/dosiin-dkmv-dkmv-square-destroyed-jean-111354111354.jpeg' },
        { id: 7, name: 'Great product name goes here', type: "t-shirt", rating: 3, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 150, brand: 'Uniqlo', imgLink: 'https://cdn.cliqueinc.com/posts/287554/cheap-summer-pieces-from-amazon-287554-1591125498603-main.700x0c.jpg' },
        { id: 8, name: 'Great product name goes here', type: "t-shirt", rating: 4, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 160, brand: 'Nike', imgLink: 'https://images.wsj.net/im-269369?width=1280&size=1' },
        { id: 9, name: 'Great product name goes here', type: "t-shirt", rating: 2, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 240, brand: 'Louis Vuiton', imgLink: 'https://ae01.alicdn.com/kf/Hd482a5bb302649ea865d256b997872a9f.jpg' },
        { id: 10, name: 'Great product name goes here', type: "skirt", rating: 5, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 380, brand: 'Addidas', imgLink: 'https://ae01.alicdn.com/kf/H34f750e5aa7e45c7aa814c3c1d19e220R/Summer-Dresses-Women-Renaissance-Dress-Gathered-Dresses-Clothes-Square-Neck-Smocked-Waist-A-Line-Solid-Adjustable.jpeg_Q90.jpeg_.webp' }
    ];
    let store: MockStore<{}>;
    const loadingState = {
        isList: true,
        products: Array<Product>(),
        filteredProducts: Array<Product>(),
        searchType: '',
        choosenBrand: [],
        price: 0,
    };
    const loadingState2 = {
        isList: true,
        products: [
            { id: 1, name: 'Great product name goes here', type: "shorts", rating: 4, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 140, brand: 'Gucci', imgLink: 'https://static.dosi-in.com/images/detailed/111/dosiin-dkmv-dkmv-square-destroyed-jean-111354111354.jpeg' },
            { id: 2, name: 'Great product name goes here', type: "t-shirt", rating: 3, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 150, brand: 'Uniqlo', imgLink: 'https://cdn.cliqueinc.com/posts/287554/cheap-summer-pieces-from-amazon-287554-1591125498603-main.700x0c.jpg' },
            { id: 3, name: 'Great product name goes here', type: "t-shirt", rating: 4, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 160, brand: 'Nike', imgLink: 'https://images.wsj.net/im-269369?width=1280&size=1' },
            { id: 4, name: 'Great product name goes here', type: "t-shirt", rating: 2, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 240, brand: 'Louis Vuiton', imgLink: 'https://ae01.alicdn.com/kf/Hd482a5bb302649ea865d256b997872a9f.jpg' },
            { id: 5, name: 'Great product name goes here', type: "skirt", rating: 5, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 380, brand: 'Addidas', imgLink: 'https://ae01.alicdn.com/kf/H34f750e5aa7e45c7aa814c3c1d19e220R/Summer-Dresses-Women-Renaissance-Dress-Gathered-Dresses-Clothes-Square-Neck-Smocked-Waist-A-Line-Solid-Adjustable.jpeg_Q90.jpeg_.webp' },
            { id: 6, name: 'Great product name goes here', type: "shorts", rating: 4, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 140, brand: 'Gucci', imgLink: 'https://static.dosi-in.com/images/detailed/111/dosiin-dkmv-dkmv-square-destroyed-jean-111354111354.jpeg' },
            { id: 7, name: 'Great product name goes here', type: "t-shirt", rating: 3, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 150, brand: 'Uniqlo', imgLink: 'https://cdn.cliqueinc.com/posts/287554/cheap-summer-pieces-from-amazon-287554-1591125498603-main.700x0c.jpg' },
            { id: 8, name: 'Great product name goes here', type: "t-shirt", rating: 4, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 160, brand: 'Nike', imgLink: 'https://images.wsj.net/im-269369?width=1280&size=1' },
            { id: 9, name: 'Great product name goes here', type: "t-shirt", rating: 2, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 240, brand: 'Louis Vuiton', imgLink: 'https://ae01.alicdn.com/kf/Hd482a5bb302649ea865d256b997872a9f.jpg' },
            { id: 10, name: 'Great product name goes here', type: "skirt", rating: 5, description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.', price: 380, brand: 'Addidas', imgLink: 'https://ae01.alicdn.com/kf/H34f750e5aa7e45c7aa814c3c1d19e220R/Summer-Dresses-Women-Renaissance-Dress-Gathered-Dresses-Clothes-Square-Neck-Smocked-Waist-A-Line-Solid-Adjustable.jpeg_Q90.jpeg_.webp' }
        ],
        filteredProducts: Array<Product>(),
        searchType: '',
        choosenBrand: [],
        price: 0,
    };
    let productTypeFilterMock: string;
    let brandFilterMock: Array<string>;
    let priceFilterMock: number;

    let fixture: ComponentFixture<ListProductComponent>;
    let listProduct: ListProductComponent;
    let priceRangeServiceMock: PriceRangeService;
    let brandsServiceMock: BrandsService;
    let productTypeServiceMock: ProductTypeService;
    let getProductServiceMock: HttpServerService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ListProductComponent
            ],
            providers: [
                HttpServerService,
                { provide: HttpServerService },
                provideMockStore({ initialState: loadingState })
            ],
            imports: [
                StoreModule.forRoot({ products: productReducer }),
                HttpClientTestingModule
            ],
        }).compileComponents();
        httpService = TestBed.inject(HttpServerService);
        httpTestingController = TestBed.inject(HttpTestingController);
        store = TestBed.get(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListProductComponent);
        listProduct = fixture.componentInstance;
        priceRangeServiceMock = jasmine.createSpyObj('PriceRangeService', ['setPriceFilter']);
        (priceRangeServiceMock.setPriceFilter as jasmine.Spy).and.returnValue(of(price));
        brandsServiceMock = jasmine.createSpyObj('BrandsService', ['setBrandFilter']);
        (brandsServiceMock.setBrandFilter as jasmine.Spy).and.returnValue(of(brandsMock));
        productTypeServiceMock = jasmine.createSpyObj('ProductTypeService', ['setProductFilter']);
        (productTypeServiceMock.setProductFilter as jasmine.Spy).and.returnValue(of(type));
        getProductServiceMock = jasmine.createSpyObj('httpServerService', ['getProducts']);
        (getProductServiceMock.getProducts as jasmine.Spy).and.returnValue(of(productsMock));

    })

    // xit('should call ngOnInit', () => {
    //     listProduct.ngOnInit();
    //     expect(listProduct.priceFilter).toEqual(0);
    //     expect(listProduct.productTypeFilter).toEqual('');
    //     expect(listProduct.products).toEqual([]);
    //     const req = httpTestingController.expectOne(
    //         'http://localhost:3000/products'
    //     );
    //     req.flush(productsMock);
    //     httpTestingController.verify()
    // })


    it('should not change products list', () => {
        spyOn(store, 'dispatch').and.callThrough();
        listProduct.brandFilter = []; listProduct.productTypeFilter = ''; listProduct.priceFilter = 0;
        listProduct.filter();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(updateProducts({ products: [] }));
    })

    it('should change products list', () => {
        listProduct.brandFilter = [{
            name: 'name',
            amount: 30,
            checked: true,
        },
        {
            name: 'name',
            amount: 20,
            checked: false,
        }];
        listProduct.productTypeFilter = 'shorts';
        listProduct.priceFilter = 200;
        listProduct.filter();
        expect(listProduct.products).toEqual([])

    })

    it('should change products list', () => {
        listProduct.brandFilter = [{
            name: 'name',
            amount: 30,
            checked: true,
        },
        {
            name: 'name',
            amount: 20,
            checked: false,
        }];
        listProduct.productTypeFilter = '';
        listProduct.priceFilter = 0;
        listProduct.filter();
        listProduct.checkBrandFilter('Gucci');
        listProduct.checkPriceFilter(300);
        listProduct.checkProductTypeFilter('shorts');
        expect(listProduct.products).toEqual([])
    })
});

// spyOn(store, 'dispatch').and.callThrough();
// expect(store.dispatch).toHaveBeenCalledTimes(1);
// expect(store.dispatch).toHaveBeenCalledWith(updateProducts({ products: [] }));
// const req = httpTestingController.expectOne(
//     'http://localhost:3000/products'
// );
// req.flush(productsMock);
// httpTestingController.verify();