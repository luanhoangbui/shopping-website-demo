import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { changeView, orderLatest, orderNewest } from '../Actions/products.action';
import { Products } from '../list-product/product.model';
import { productReducer } from '../Reducers/products.reducer';
import { ViewTypeComponent } from './view-type.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ViewTypeComponent', () => {
    let store: MockStore<{}>;
    const loadingState = {
        isList: true,
        products: Array<Products>(),
        filteredProducts: Array<Products>(),
        searchType: '',
        choosenBrand: [],
        price: 0,
    };
    let fixture: ComponentFixture<ViewTypeComponent>;
    let viewType: ViewTypeComponent;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                provideMockStore({ initialState: loadingState })
            ],
            imports: [
                StoreModule.forRoot({ products: productReducer })
            ],
            declarations: [
                ViewTypeComponent
            ],
        }).compileComponents();
        store = TestBed.get(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewTypeComponent);
        viewType = fixture.componentInstance;
    })

    it('should run app', () => {
        expect(viewType).toBeTruthy;
    })

    it('should have products list', () => {
        expect(viewType.products).toEqual([])
    })

    it('should call ngOnInit', () => {
        viewType.ngOnInit();
        expect(viewType.products).toEqual([])
    })

    it('should call onLatest', () => {
        spyOn(store, 'dispatch').and.callThrough();
        viewType.onLatest();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(orderLatest());
    });

    it('should call onNewest', () => {
        spyOn(store, 'dispatch').and.callThrough();
        viewType.onNewest();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(orderNewest());
    });

    it('should call onList', () => {
        spyOn(store, 'dispatch').and.callThrough();
        viewType.onList();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeView({ view: true }));
    });

    it('should call onGrid', () => {
        spyOn(store, 'dispatch').and.callThrough();
        viewType.onGrid();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(changeView({ view: false }));
    });

});