import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { updateProducts, orderLatest, orderNewest, brandFilter, changeView, updateFilter } from '../Actions/products.action';
import { Products } from '../list-product/product.model';

export const initialState = {
  isList: true,
  products: Array<Products>(),
  filteredProducts: Array<Products>(),
  searchType: '',
  choosenBrand: [],
  price: 0,
};

let view = true;
let amount: number;
const _productReducer = createReducer(

  initialState,

  on(updateFilter, (state, { searchType, choosenBrand, price }) => ({ ...state, searchType: searchType, choosenBrand: choosenBrand, price: price })),

  on(updateProducts, (state, { products }) => ({ ...state, products: products })),

  on(changeView, (state, { view }) => ({ ...state, isList: view })),

  on(orderLatest, (state) => {
    let copyState = [...state.products];
    return { ...state, products: copyState.sort((a, b) => (a.id > b.id ? 1 : -1)) };
  }),

  on(orderNewest, (state) => {
    let copyState = [...state.products];
    return { ...state, products: copyState.sort((a, b) => (a.id > b.id ? -1 : 1)) };
  },
  ));

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}