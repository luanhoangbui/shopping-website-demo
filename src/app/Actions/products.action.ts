import { createAction, props } from '@ngrx/store';
import { Products } from '../list-product/product.model';

export const updateProducts = createAction('[Products Component] UpdateProducts',
        props<{ products: Array<Products> }>());

export const updateFilter = createAction('[Products Component] UpdateFilter',
        props<{ searchType: '', choosenBrand: [], price: 0 }>());

export const orderLatest = createAction('[Products Component] OderLatest');
export const orderNewest = createAction('[Products Component] OderNewest');
export const brandFilter = createAction('[Products Component] BrandFilter');
export const changeView = createAction('[Products Component] ChangeView',
        props<{ view: boolean }>());
