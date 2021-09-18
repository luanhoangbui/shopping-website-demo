import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Products } from './list-product/product.model';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './Reducers/products.reducer';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  const productsMock: Array<Products[]> = []


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ products: productReducer })
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  })

  it('should have products list', () => {
    expect(app.products).toEqual([])
  })

  it('should call ngOnInit', () => {
    app.ngOnInit();
  })
});


