import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    public productService: ProductService,
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }
}
