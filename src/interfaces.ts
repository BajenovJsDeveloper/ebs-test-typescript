export interface Product {
  name: string;
  category: Category;
  price: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface ICartProducts extends Product {
  id: number;
  count: number;
  tempcount: number;
}
