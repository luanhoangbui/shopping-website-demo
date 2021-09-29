import { createAction, props } from '@ngrx/store';
import { Product } from '../list-product/product.model';

export const updateProducts = createAction('[Products Component] updateProducts',
        props<{ products: Array<Product> }>());

export const updateFilter = createAction('[Products Component] updateFilter',
        props<{ searchType: '', choosenBrand: [], price: 0 }>());

export const orderLatest = createAction('[Products Component] oderLatest');
export const orderNewest = createAction('[Products Component] oderNewest');
export const brandFilter = createAction('[Products Component] brandFilter');
export const changeView = createAction('[Products Component] changeView',
        props<{ view: boolean }>());
