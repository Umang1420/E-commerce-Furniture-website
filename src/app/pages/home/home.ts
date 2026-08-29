import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

declare const initFurniUI: any;
declare var tns: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  // ================= PRODUCTS =================
  products: any[] = [];
  featuredProducts: any[] = [];

  // ================= CONTACT FORM =================
  contactData = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  // ================= LOAD PRODUCTS =================
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.featuredProducts = data.slice(0, 3);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // ================= ADD TO CART =================
  addToCart(product: any) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(product);
  }

  // ================= CONTACT SUBMIT =================
 submitContactForm(form: any) {

  if (form.invalid) {
    return;
  }

  const payload = {
    name: this.contactData.firstName + ' ' + this.contactData.lastName,
    email: this.contactData.email,
    subject: 'Contact Form',
    message: this.contactData.message
  };

  this.http.post('http://localhost:5000/api/contact', payload)
    .subscribe({
      next: () => {

        alert('Message sent successfully!');

        // ✅ Reset Angular form completely
        form.resetForm();

        // ✅ Also reset object (extra safe)
        this.contactData = {
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        };

      },
      error: (err) => {
        console.error(err);
      }
    });
}
  // ================= UI SCRIPTS =================
  ngAfterViewInit(): void {

    setTimeout(() => {

      if (typeof initFurniUI === 'function') {
        initFurniUI();
      }

      if (typeof tns === 'function') {
        tns({
          container: '.testimonial-slider',
          items: 1,
          slideBy: 'page',
          autoplay: true,
          controls: true,
          nav: true,
          autoplayButtonOutput: false
        });
      }

    }, 0);
  }
}