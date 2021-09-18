import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PriceRangeComponent } from './price-range.component';
import { PriceRangeService } from './price-range.service';

describe('PriceRangeComponent', () => {
    const price = 0;
    let fixture: ComponentFixture<PriceRangeComponent>;
    let priceRange: PriceRangeComponent;
    let priceRangeServiceMock: PriceRangeService;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                PriceRangeComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PriceRangeComponent);
        priceRange = fixture.componentInstance;
        priceRangeServiceMock = jasmine.createSpyObj('PriceRangeService', ['setPriceFilter']);
        (priceRangeServiceMock.setPriceFilter as jasmine.Spy).and.returnValue(of(price))
    })

    it('should called PriceFilter with price', () => {
        priceRangeServiceMock.setPriceFilter(price);
        expect(priceRangeServiceMock.setPriceFilter).toHaveBeenCalledWith(price);
    })

    it('should call ngOnInit', () => {
        priceRange.ngOnInit();
    })

    it('should call onSlider', () => {
        let event = {
            value: 10
        }
        priceRange.onSlider(event);
        expect(priceRange.price).toEqual(event.value)
    })

    it('should call onInput', () => {
        let event = {
            target: { value: 10 },
        }
        priceRange.onInput(event);
        expect(priceRange.price).toEqual(event.target.value)
    })
});