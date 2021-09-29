import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Brand } from "./brand.model";

@Injectable({
    providedIn: 'root'
})
export class BrandsService {
    private data = new BehaviorSubject(Array<Brand>());
    public asdata = this.data.asObservable();
    constructor() { }
    public setBrandFilter(brandsName: Array<Brand>) {
        this.data.next(brandsName);
    }
}