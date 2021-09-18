import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Brands } from "./brand.model";

@Injectable({
    providedIn: 'root'
})
export class BrandsService {
    private data = new BehaviorSubject(Array<Brands>());
    public asdata = this.data.asObservable();
    constructor() { }
    public setBrandFilter(brandsName: Array<Brands>) {
        this.data.next(brandsName);
    }
}