import { createAction, props } from '@ngrx/store';
import { Products } from './list-product/product.model';

export const increment = createAction('[Counter Component] Increment',
        props< {products: Array<Products>} >());
export const reset = createAction('[Counter Component] Reset');
export const init = createAction('[Counter Component] Init');