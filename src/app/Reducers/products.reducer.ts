import { createReducer, on } from '@ngrx/store';
import { increment, orderLatest, orderNewest, brandFilter, changeView, searchProducts } from '../Actions/products.action';
import { Products } from '../list-product/product.model';

export const initialState = {
  isList: true,
  products: Array<Products>(),
  searchedProducts: Array<Products>(),
};
let view = true;
const _productReducer = createReducer(

  initialState,

  on(searchProducts, (state, { products, searchedProducts }) => ({ ...state, products: products, searchedProducts: searchedProducts })),

  on(increment, (state, { products }) => ({ ...state, products: products })),

  on(changeView, (state, { view }) => ({ ...state, isList: view })),

  on(orderLatest, (state) => {
    let copyState = [...state.products];
    return { ...state, products: copyState.sort((a, b) => (a.id > b.id ? 1 : -1)) };
  }),

  on(orderNewest, (state) => {
    let copyState = [...state.products];
    return { ...state, products: copyState.sort((a, b) => (a.id > b.id ? -1 : 1)) };
  },





    // on(orderLatest, (state) => {
    //   let copyState = [...state];
    //   return copyState.sort((a, b) => (a.id > b.id ? 1 : -1));
    // }),

    // on(orderNewest, (state) => {
    //   let copyState = [...state];
    //   return copyState.sort((a, b) => (a.id > b.id ? -1 : 1));
    // }),

  ));

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}