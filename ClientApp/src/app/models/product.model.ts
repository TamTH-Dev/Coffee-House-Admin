export interface Product {
  productID?: number;
  productName: string;
  imgPath?: string;
  categoryID?: number;
  categoryName?: string;
  description: string;
  quantity: number;
  price: number;
  status?: boolean;
}