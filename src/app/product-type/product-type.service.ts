import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductTypeService {
    private data = new BehaviorSubject('');
    public asdata = this.data.asObservable();
    constructor() { }
    public setProductFilter(productType: string) {
        this.data.next(productType);
    }
}
