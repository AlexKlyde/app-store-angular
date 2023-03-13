import { Product } from '../../products/models/product.model';

export interface Order {
  name: string;
  id?: string;
  phone: string;
  address: string;
  payment: string;
  price: number;
  orders: Product[];
  date: Date;
}