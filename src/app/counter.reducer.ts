import { createReducer, on } from '@ngrx/store';
import { increment, reset } from './counter.action';
import { Products } from './list-product/product.model';

export const products: Array<Products> = [];
 
const _productReducer = createReducer(
  products,
  on(increment, (state, {products}) => {
    console.log(products);
    return products;
  }),
  on(reset, (state) => [])
);

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}