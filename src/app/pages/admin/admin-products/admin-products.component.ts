import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'] 
})
export class AdminProductsComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef   // 🔥 IMPORTANT
  ) {
    console.log('ADMIN PRODUCTS COMPONENT LOADED');
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('FINAL DATA:', data);

        this.products = data;        // assign
        this.cdr.detectChanges();    // 🔥 FORCE UI UPDATE
      },
      error: (err) => console.error(err)
    });
  }
 deleteProduct(id: string) {

  const ok = confirm('Delete this product?');
  if (!ok) return;

  this.productService.deleteProduct(id).subscribe({

    next: () => {

      alert('Product deleted successfully');

      // ✅ OPTION 1: reload products from backend (BEST)
      this.productService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.cdr.detectChanges();
        }
      });

      // ✅ OPTION 2 (alternative): simple UI remove (your old way)
      // this.products = this.products.filter(p => p._id !== id);

    },

    error: (err) => {
      console.error('DELETE ERROR', err);
      alert('Delete failed');
    }

  });

}



}

