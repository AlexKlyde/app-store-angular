import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { CartService } from '../../cart/services/cart.service';
import { Product } from '../../products/models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService.getProduct(params.get('id'))
      ))
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }
}
