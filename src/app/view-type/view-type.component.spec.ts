import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { State, Store, StoreModule } from '@ngrx/store';
import { orderLatest, updateProducts } from '../Actions/products.action';
import { Products } from '../list-product/product.model';
import { initialState, productReducer } from '../Reducers/products.reducer';
import { ViewTypeComponent } from './view-type.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ViewTypeComponent', () => {
    let store: MockStore<{}>;
    let initialStateMock = initialState;
    let fixture: ComponentFixture<ViewTypeComponent>;
    let viewType: ViewTypeComponent;
    const productsMock: Array<Products> = [];
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                provideMockStore({ initialState })
            ],
            imports: [
                StoreModule.forRoot({ products: productReducer })
            ],
            declarations: [
                ViewTypeComponent
            ],
        }).compileComponents();
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(ViewTypeComponent);
        viewType = fixture.componentInstance;
    })

    it('should run app', () => {
        expect(viewType).toBeTruthy;
    })

    it('should call ngOnInit', () => {
        viewType.ngOnInit();
        fixture.detectChanges();
        expect(viewType.products).toEqual(productsMock);
    });

    // it('should call onLatest', () => {
    //     const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    //     viewType.onLatest();
    //     fixture.detectChanges();
    //     expect(storeSpy).toHaveBeenCalledTimes(1);
    // });

    // it('should call onList', async(() => {
    //     viewType.onList();
    // }));

    // it('should call onGrid', async(() => {
    //     viewType.onGrid();
    // }));

    // it('should call onNewest', async(() => {
    //     viewType.onNewest();
    // }));
});