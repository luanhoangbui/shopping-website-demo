import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Brand } from './brand.model';
import { BrandsComponent } from './brands.component';
import { BrandsService } from './brands.service';


describe('BrandComponent', () => {
    const brandsMock: Array<Brand> = [
        { name: 'Gucci', amount: 120, checked: false },
        { name: 'Addidas', amount: 15, checked: false },
        { name: 'Nike', amount: 35, checked: false },
        { name: 'Uniqlo', amount: 89, checked: false },
        { name: 'Louis Vuiton', amount: 30, checked: false },
    ];

    let fixture: ComponentFixture<BrandsComponent>;
    let brand: BrandsComponent;
    let brandsServiceMock: BrandsService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                BrandsComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BrandsComponent);
        brand = fixture.componentInstance;
        brandsServiceMock = jasmine.createSpyObj('BrandService', ['setBrandFilter']);
        (brandsServiceMock.setBrandFilter as jasmine.Spy).and.returnValue(of(brandsMock))
    })


    it('should called BrandFilter with brands[]', () => {
        brandsServiceMock.setBrandFilter(brandsMock);
        expect(brandsServiceMock.setBrandFilter).toHaveBeenCalledWith(brandsMock);
    })

    it('should called onChecked with brand', () => {
        brand.onCheck(brandsMock[0]);
        expect(brandsMock[0].checked).toBeTruthy;
    })

    it('should called ngOnInit', () => {
        brand.ngOnInit();
    })
});
