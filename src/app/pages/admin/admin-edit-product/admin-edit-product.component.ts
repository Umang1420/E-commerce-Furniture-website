import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-admin-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css'] 
})
export class AdminEditProductComponent implements OnInit {

  product: any = null;
  id!: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef   // ✅ IMPORTANT
  ) {}

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id')!;

    console.log("Edit ID:", this.id);

    this.productService.getProductById(this.id)
      .subscribe({
        next: (data: any) => {

          console.log("Product loaded:", data);

          this.product = data;

          this.loading = false;

          this.cdr.detectChanges();  // ✅ FORCE UI UPDATE (FIXES YOUR ISSUE)

        },
        error: (err) => {

          console.error(err);

          this.loading = false;

        }
      });

  }

  updateProduct() {

    this.productService.updateProduct(this.id, this.product)
      .subscribe(() => {

        alert('Product updated');

        this.router.navigate(['/admin/products']);

      });

  }

}
