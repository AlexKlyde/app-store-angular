import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Order } from './models/order.model';
import { Product } from '../products/models/product.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  message = '';
  cartProducts = [];
  totalPrice = 0;
  submitted = false;
  orderForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    payment: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartProducts = this.cartService.getProducts();
    this.totalPrice = this.cartProducts
      .reduce((total, item) => item.price + total, 0);
  }

  get name() { return this.orderForm.controls['name']; }
  get phone() { return this.orderForm.controls['phone']; }
  get address() { return this.orderForm.controls['address']; }
  get payment() { return this.orderForm.controls['payment']; }

  onSubmit() {
    if (this.orderForm.invalid) return;

    this.submitted = true;

    const order: Order = {
      name: this.name.value,
      phone: this.phone.value,
      address: this.address.value,
      payment: this.payment.value,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()
    }

    this.cartService.add(order).subscribe({
      next: () => {
        this.orderForm.reset();
        this.submitted = false;
        this.message = 'Your order is sent successfully'
      },
      error: () => {
        this.submitted = false;
      }
    });
  }

  onDelete(product: Product) {
    this.totalPrice -= +product.price;
    this.cartService.removeFromCart(product);
  }
}
