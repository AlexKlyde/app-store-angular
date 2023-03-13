import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../products/models/product.model';
import { ProductService } from '../../products/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  productName;
  prodSub: Subscription;
  removeSub: Subscription;
  
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.prodSub = this.productService.getProducts()
      .subscribe((products: Product[]) => {
        if (products) {
          this.products = products;
        }
    })
  }

  ngOnDestroy() {
    if (this.prodSub) {
      this.prodSub.unsubscribe()
    }

    if (this.removeSub) {
      this.removeSub.unsubscribe()
    }
  }

  onDelete(id: string) {
    this.removeSub = this.productService.delete(id)
      .subscribe(() => this.products = this.products
        .filter(product => product.id !== id)
      )
  }

}
