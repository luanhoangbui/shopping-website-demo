import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BrandsService {
    private data = new BehaviorSubject(Array<{ name: string, ammount: string, checked: boolean }>());
    public asdata = this.data.asObservable();
    constructor() { }
    public setBrandFilter(brandsName: Array<{ name: string, ammount: string, checked: boolean }>) {
        this.data.next(brandsName);
    }
}