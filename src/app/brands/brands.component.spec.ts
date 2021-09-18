import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Brands } from './brand.model';
import { BrandsComponent } from './brands.component';
import { BrandsService } from './brands.service';

describe('BrandComponent', () => {
    const brandsMock: Array<Brands> = [
        { name: 'Gucci', amount: 120, checked: false },
        { name: 'Addidas', amount: 15, checked: false },
        { name: 'Nike', amount: 35, checked: false },
        { name: 'Uniqlo', amount: 89, checked: false },
        { name: 'Louis Vuiton', amount: 30, checked: false },
    ];
    const nameMock = 'Gucci';
    let fixture: ComponentFixture<BrandsComponent>;
    let brands: BrandsComponent;
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
        brands = fixture.componentInstance;
        brandsServiceMock = jasmine.createSpyObj('BrandService', ['setBrandFilter']);
        (brandsServiceMock.setBrandFilter as jasmine.Spy).and.returnValue(of(brandsMock))
    })

    it('should have brand list', () => {
        expect(brands.brands).toEqual(brandsMock)
    })

    it('should check brand', () => {
        expect(brandsServiceMock.setBrandFilter).toHaveBeenCalledWith(brandsMock)
    })
});