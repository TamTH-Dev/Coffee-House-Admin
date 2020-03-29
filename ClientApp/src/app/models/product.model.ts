export interface Product {
  productID?: number;
  productName: string;
  imgPath?: string;
  categoryID?: number;
  category?: string;
  description: string;
  quantity: number;
  price: number;
  status?: boolean;
}

export interface Category {
  categoryID?: number,
  category: string,
  status?: boolean,
  isFiltered?: boolean
}