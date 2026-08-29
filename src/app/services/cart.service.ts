import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'furni_cart';
  private MAX_PER_PRODUCT = 3;
  private items: any[] = [];
  isCheckout = false; 
  
constructor(private authService: AuthService) {

  this.authService.getAuthState().subscribe(isLoggedIn => {
    if (isLoggedIn) {
      this.loadCart();      // ✅ user logged in → load cart
    } else {
      this.clearCart();     // ❌ user logged out → clear cart
    }
  });

}
addToCart(product: any) {

  const normalizedProduct = {
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  };

  const existing = this.items.find(
    item => item.id === normalizedProduct.id
  );

  if (existing) {

    // ✅ LIMIT CHECK
    if (existing.quantity >= this.MAX_PER_PRODUCT) {
      alert(`You can only buy maximum ${this.MAX_PER_PRODUCT} units of this product`);
      return;
    }

    existing.quantity += 1;

  } else {
    this.items.push(normalizedProduct);
  }

  this.saveCart();
}


  // ✅ SAVE TO LOCALSTORAGE
  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    console.log('CART SAVED TO LOCALSTORAGE');
  }

  // ✅ LOAD FROM LOCALSTORAGE
  private loadCart() {
    const data = localStorage.getItem(this.cartKey);

    if (data) {
      this.items = JSON.parse(data);
    } else {
      this.items = [];
    }

    console.log('CART LOADED:', this.items);
  }

  // ===== CART HELPERS =====

  getItems() {
    return this.items;
  }

 increase(item: any) {

  if (item.quantity >= this.MAX_PER_PRODUCT) {
    alert(`Maximum limit is ${this.MAX_PER_PRODUCT}`);
    return;
  }

  item.quantity++;
  this.saveCart();
}


  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  remove(item: any) {
    this.items = this.items.filter(i => i.id !== item.id);
    this.saveCart();
  }

  // ===== TOTALS =====

  getSubtotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getDiscount(): number {
    return this.couponApplied ? Math.round(this.getSubtotal() * 0.1) : 0;
  }

  getFinalTotal(): number {
    return this.getSubtotal() - this.getDiscount();
  }

  // ===== COUPON =====

  private couponApplied = false;

  applyCoupon(code: string): boolean {
    if (code === 'SAVE10') {
      this.couponApplied = true;
      return true;
    }
    return false;
  }
clearCart() {
  this.items = [];
  localStorage.removeItem('furni_cart');
}

getCartCount(): number {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
}

}
