import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {

  couponCode = '';
  couponMessage = '';

  constructor(public cartService: CartService) {}

  applyCoupon(): void {
    const applied = this.cartService.applyCoupon(this.couponCode);
    this.couponMessage = applied
      ? 'Coupon applied successfully!'
      : 'Invalid coupon code';
  }
}
