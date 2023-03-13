import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { fbResponse } from '../../shared/models/fb-response.model';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';
import { Product } from '../../products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] = [];
  productsCount$ = new Subject<number>();

  constructor(private http: HttpClient) { }

  add(order: Order) {
    return this.http
      .post(`${environment.dbUrl}/orders.json`, order)
      .pipe(map((res: fbResponse) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      }))
  }

  getOrders() {
    return this.http.get<Order[]>(`${environment.dbUrl}/orders.json`)
      .pipe(map(res => {
        if (!res) {
          return null;
        };
        
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }))
  }

  delete(id: string) {
    return this.http.delete(`${environment.dbUrl}/orders/${id}.json`)
  }

  getProducts() {
    return this.products;
  }

  addToCart(product: Product) {
    this.products.push(product);
    this.productsChanged();
  }

  removeFromCart(product: Product) {
    this.products.splice(this.products.indexOf(product), 1);
    this.productsChanged();
  }

  productsChanged() {
    this.productsCount$.next(this.products.length);
  }
}
