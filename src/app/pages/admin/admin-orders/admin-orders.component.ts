import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {

    console.log("Loading orders...");

    this.orderService.getOrders().subscribe({

      next: (data: any[]) => {

        console.log("Orders received:", data);

        this.orders = data;

        this.loading = false;

        this.cdr.detectChanges(); // 🔥 important fix

      },

      error: (err) => {

        console.error("Order error:", err);

        this.loading = false;

      }

    });

  }

}
