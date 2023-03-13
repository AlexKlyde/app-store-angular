import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  type = '';
  cartCount = 0;
  private sub: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.fragment;
    this.productService.setType(this.type);
    this.sub = this.cartService.productsCount$.subscribe(
      value => this.cartCount = value
      )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSetType(type: string) {
    this.type = type;

    this.router.navigate(['/products'], {
      fragment: this.type
    })

    this.productService.setType(this.type);
  }
}
