export class Product {
  productID?: number;
  productName: string;
  category: Category;
  description: string;
  quantity: number;
  price: number;
  status?: boolean;
}

export interface CategoryFilter {
  type: string,
  isActive: boolean
}

export enum Category {
  MilkTea = 'Milk Tea',
  Coffee = 'Coffee',
  Pudding = 'Pudding'
}