export interface Product {
  productID?: number;
  productName: string;
  category: Category;
  description: string;
  quantity: number;
  price: number;
  status?: boolean;
}

export enum Category {
  MilkTea = 'Milk Tea',
  Coffee = 'Coffee',
  Pudding = 'Pudding'
}