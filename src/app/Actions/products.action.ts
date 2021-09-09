import { createAction, props } from '@ngrx/store';
import { Products } from '../list-product/product.model';

export const increment = createAction('[Products Component] Increment',
        props<{ products: Array<Products> }>());
export const searchProducts = createAction('[Products Component] SearchProducts',
        props<{ products: Array<Products>, searchedProducts: Array<Products> }>());
export const cacheIncrement = createAction('[Products Component] CacheIncrement',
        props<{ products: Array<Products> }>());
export const orderLatest = createAction('[Products Component] OderLatest');
export const orderNewest = createAction('[Products Component] OderNewest');
export const brandFilter = createAction('[Products Component] BrandFilter');
export const changeView = createAction('[Products Component] ChangeView',
        props<{ view: boolean }>());

