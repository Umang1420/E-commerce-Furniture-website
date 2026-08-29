import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent {

  product = {
  name: '',
  price: '',
  image: '',
  category: '',
  description: ''
};


  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct() {
    if (!this.product.name || !this.product.price || !this.product.image) {
      alert('Fill all fields');
      return;
    }

    this.productService.addProduct(this.product).subscribe({
      next: () => {
        alert('Product added successfully');
        this.router.navigate(['/admin/products']); // go back to gallery
      },
      error: (err) => {
        console.error(err);
        alert('Error adding product');
      }
    });
  }
}
