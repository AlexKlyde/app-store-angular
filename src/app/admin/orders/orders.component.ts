import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../../cart/models/order.model';
import { CartService } from '../../cart/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  orderSub: Subscription;
  removeSub: Subscription;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.orderSub = this.cartService.getOrders()
      .subscribe((orders: Order[]) => {
        if (orders) {
          this.orders = orders;
        }
      })
  }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }

    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

  onDelete(id: string) {
    this.removeSub = this.cartService.delete(id)
      .subscribe(() => this.orders = this.orders
        .filter(order => order.id !== id)
      )
  }

}
