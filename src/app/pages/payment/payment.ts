import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html'
})
export class PaymentComponent {

  orderId: string = '';

 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private orderService: OrderService,
  private cartService: CartService
) {
  this.orderId = this.route.snapshot.paramMap.get('id') || '';
}

  confirmPayment(): void {

  if (!this.orderId) return;

  this.orderService.confirmPayment(this.orderId).subscribe({
    next: () => {

      this.cartService.clearCart();   // ✅ clear properly

      this.router.navigate(['/thankyou', this.orderId]);
    }
  });
}

}