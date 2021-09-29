import { changeView, orderLatest, orderNewest, updateFilter, updateProducts } from '../Actions/products.action';
import { Product } from '../list-product/product.model';
import { productReducer } from '../Reducers/products.reducer';

describe('Reducer: Products', () => {

    beforeEach(() => {

    })

    describe('loadUpdateFilter', () => {
        it('should load new filter', () => {
            const state = {
                isList: true,
                products: Array<Product>(),
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };

            const expected = {
                isList: true,
                products: Array<Product>(),
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };
            expect(productReducer(state, updateFilter({ searchType: '', choosenBrand: [], price: 0 }))).toEqual(expected);
        })
    })

    describe('loadUpdateProducts', () => {
        it('should update products list', () => {
            const state = {
                isList: true,
                products: Array<Product>(),
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };

            const expected = {
                isList: true,
                products: Array<Product>(),
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };
            expect(productReducer(state, updateProducts({ products: Array<Product>() }))).toEqual(expected);
        })
    })

    describe('loadChangeView', () => {
        it('should not change view', () => {
            const state = {
                isList: true,
                products: Array<Product>(),
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };

            const expected = {
                isList: true,
                products: Array<Product>(),
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };
            expect(productReducer(state, changeView({ view: true }))).toEqual(expected);
        })
    });

    describe('loadChangeView', () => {
        it('should change view', () => {
            const state = {
                isList: true,
                products: Array<Product>(),
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };

            const expected = {
                isList: false,
                products: Array<Product>(),
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };
            expect(productReducer(state, changeView({ view: false }))).toEqual(expected);
        })
    })

    describe('loadOrderNewest', () => {
        it('should order product list from newest to latest', () => {
            const state = {
                isList: true,
                products: [
                    { id: 1, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                    { id: 2, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                    { id: 3, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                ] as Product[],
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };

            const expected = {
                isList: true,
                products: [
                    { id: 3, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                    { id: 2, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                    { id: 1, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                ] as Product[],
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };
            expect(productReducer(state, orderNewest())).toEqual(expected);
        })
    })

    describe('loadOrderNewest', () => {
        it('should order product list from latest to newest', () => {
            const state = {
                isList: true,
                products: [
                    { id: 3, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                    { id: 2, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                    { id: 1, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                ] as Product[],
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };

            const expected = {
                isList: true,
                products: [
                    { id: 1, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                    { id: 2, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                    { id: 3, name: 'aaa', type: 'shorts', rating: 3, description: 'abasc', price: 100, brand: 'Gucci', imgLink: 'kajshdasjd' },
                ] as Product[],
                filteredProducts: Array<Product>(),
                searchType: '',
                choosenBrand: [],
                price: 0,
            };
            expect(productReducer(state, orderLatest())).toEqual(expected);
        })
    })

})