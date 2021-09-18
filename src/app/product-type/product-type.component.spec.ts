import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductTypeComponent } from './product-type.component';
import { ProductTypeService } from './product-type.service';

describe('ProductTypeComponent', () => {
    const type: any = 'shorts';
    let fixture: ComponentFixture<ProductTypeComponent>;
    let productType: ProductTypeComponent;
    let productTypeServiceMock: ProductTypeService;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ProductTypeComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTypeComponent);
        productType = fixture.componentInstance;
        productTypeServiceMock = jasmine.createSpyObj('ProductTypeService', ['setProductFilter']);
        (productTypeServiceMock.setProductFilter as jasmine.Spy).and.returnValue(of(type))
    })

    it('should called ProductTypeFilter with price', () => {
        productTypeServiceMock.setProductFilter(type);
        expect(productTypeServiceMock.setProductFilter).toHaveBeenCalledWith(type);
    })

    it('should call ngOnInit', () => {
        productType.ngOnInit();
    })

    it('should call onInput', () => {
        let event = {
            target: {
                value: 'shorts'
            }
        }
        productType.onInput(event);
    })
});