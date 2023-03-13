import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { fbResponse } from '../../shared/models/fb-response.model';
import { Product } from '../../products/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  type = '';

  constructor(private http: HttpClient) { }

  add(product: Product) {
    return this.http
      .post(`${environment.dbUrl}/products.json`, product)
      .pipe(map((res: fbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  getProducts() {
    return this.http.get<Product[]>(`${environment.dbUrl}/products.json`)
      .pipe(map(res => {
        if (!res) return null;
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }))
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.dbUrl}/products/${id}.json`)
      .pipe(map(res => {
        if (!res) {
          return null;
        }

        return {
            ...res,
            id,
            date: new Date(res.date)
          }
      }))
  }

  delete(id: string) {
    return this.http.delete(`${environment.dbUrl}/products/${id}.json`)
  }

  update(product: Product) {
    return this.http.patch(`${environment.dbUrl}/products/${product.id}.json`, product)
  }

  setType(type: string) {
    this.type = type;
  }

}
