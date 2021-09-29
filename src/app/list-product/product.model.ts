export interface Product {
    isList: boolean;
    products: Product[];
    id: number;
    name: string;
    type: string;
    rating: number;
    description: string;
    price: number;
    brand: string;
    imgLink: string;
}