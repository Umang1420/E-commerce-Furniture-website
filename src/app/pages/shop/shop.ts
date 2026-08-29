import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

// 🔥 Tell Angular about custom.js function
declare const initFurniUI: any;

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.html',
  styleUrls: ['./shop.css']
})
export class ShopComponent implements OnInit, AfterViewInit {

  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService, // 🔥
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {}

  // 1️⃣ Load data
ngOnInit(): void {
  this.productService.getProducts().subscribe({
    next: (data) => {
      this.products = data;
      console.log('SHOP LOAD:', data.length);
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });
}




  ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof initFurniUI === 'function') {
        initFurniUI();
      }
    }, 0);
  }

addToCart(product: any) {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
    return;
  }
  this.cartService.addToCart(product);
}




}
