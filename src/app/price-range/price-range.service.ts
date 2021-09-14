import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PriceRangeService {
    private data = new BehaviorSubject(0);
    public asdata = this.data.asObservable();
    constructor() { }
    public setPriceFilter(price: number) {
        this.data.next(price);
    }
}