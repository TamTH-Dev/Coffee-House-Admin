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