import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html'
})
export class CheckoutComponent {
couponApplied = false;
orderPlaced = false;

  billing = {
    country: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    notes: ''
  };

  couponCode = '';
  couponMessage = '';

  constructor(
    public cartService: CartService,
     private orderService: OrderService,
  private authService: AuthService,
    private router: Router
  ) {}

  applyCoupon() {
  if (this.couponApplied) return;

  const ok = this.cartService.applyCoupon(this.couponCode);
  this.couponMessage = ok ? 'applied' : 'invalid';

  if (ok) {
    this.couponApplied = true;
    
  }
}

placeOrder(form: NgForm) {
  console.log("PLACE ORDER CLICKED");

  if (form.invalid) {
    console.log("Form invalid");
    return;
  }
  if (form.invalid) {
    alert('Fill all required fields');
    return;
  }

  if (this.cartService.getItems().length === 0) {
    alert('Cart is empty');
    return;
  }

  const user = this.authService.getUser();

  const orderData = {

    userId: user?._id,

    customer: {
      name: this.billing.firstName + ' ' + this.billing.lastName,
      email: this.billing.email,
      phone: this.billing.phone,
      address: this.billing.address,
      city: this.billing.city,
      state: this.billing.state,
      zip: this.billing.zip
    },

    products: this.cartService.getItems(),

    totalAmount: this.cartService.getFinalTotal(),

    paymentMethod: 'demo'

  };

 this.orderService.createOrder(orderData).subscribe({
  next: (res: any) => {

    console.log("Order created:", res);

    const orderId = res._id;   // ⚠️ MUST be _id

    if (!orderId) {
      console.log("orderId undefined");
      return;
    }

    this.router.navigate(['/payment', orderId]);

  },
  error: (err) => {
    console.log("Error creating order:", err);
  }
});
}


}
