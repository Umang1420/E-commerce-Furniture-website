import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thankyou.html'
})
export class ThankyouComponent {

  orderId: string = '';
  order: any;

constructor(
  private route: ActivatedRoute,
    private router: Router, 
  private orderService: OrderService
) {
  this.orderId = this.route.snapshot.paramMap.get('id') || '';

  console.log("Route Order ID:", this.orderId);

  this.orderService.getOrderById(this.orderId).subscribe({
    next: (data) => {
      console.log("Order from backend:", data);
      this.order = data;
    },
    error: (err) => {
      console.log("Error loading order:", err);
    }
  });
}
 downloadInvoice() {

  if (!this.order) return;

  const doc = new jsPDF();

  let y = 20;

  // HEADER
  doc.setFontSize(18);
  doc.text("FURNI STORE", 80, y);
  y += 10;

  doc.setFontSize(14);
  doc.text("INVOICE", 90, y);
  y += 15;

  doc.setFontSize(11);
  doc.text(`Order ID: ${this.order._id}`, 20, y);
  y += 7;

  doc.text(`Transaction ID: ${this.order.transactionId}`, 20, y);
  y += 7;

  doc.text(`Date: ${new Date(this.order.createdAt).toLocaleDateString()}`, 20, y);
  y += 10;

  // CUSTOMER DETAILS
  doc.setFontSize(12);
  doc.text("Bill To:", 20, y);
  y += 7;

  doc.setFontSize(11);
  doc.text(`${this.order.customer.name}`, 20, y);
  y += 6;

  doc.text(`${this.order.customer.email}`, 20, y);
  y += 6;

  doc.text(`${this.order.customer.address}`, 20, y);
  y += 6;

  doc.text(`${this.order.customer.city}, ${this.order.customer.state}`, 20, y);
  y += 10;

  // PRODUCTS TABLE HEADER
  doc.setFontSize(12);
  doc.text("Products:", 20, y);
  y += 8;

  doc.setFontSize(11);

  doc.text("Product", 20, y);
  doc.text("Qty", 120, y);
  doc.text("Price", 140, y);
  doc.text("Total", 170, y);
  y += 5;

  doc.line(20, y, 190, y);
  y += 5;

  // PRODUCTS LOOP
  
this.order.products.forEach((item: any) => {

  const name = item.name || '';
  const quantity = Number(item.quantity) || 0;
  const price = Number(item.price) || 0;
  const total = quantity * price;

  doc.text(String(name), 20, y);
  doc.text(String(quantity), 120, y);
  doc.text(`Rs. ${price.toFixed(2)}`, 140, y);
  doc.text(`Rs. ${total.toFixed(2)}`, 170, y);

  y += 8;

});

  y += 5;
  doc.line(20, y, 190, y);
  y += 10;

  // TOTAL
  doc.setFontSize(13);
  doc.text(`Grand Total: Rs. ${Number(this.order.totalAmount).toFixed(2)}`, 140, y);

  y += 10;

  doc.setFontSize(11);
  doc.text(`Payment Status: ${this.order.paymentStatus}`, 20, y);
y += 20;

doc.setFontSize(12);
doc.text("Thank you for shopping with Furni Store!", 20, y);
y += 7;


doc.setFontSize(10);
doc.text("For any queries, contact us:", 20, y);
y += 6;

doc.text("Phone: +91 9876543210", 20, y);
y += 6;

doc.text("Email: support@furnistore.com", 20, y);
y += 6;

doc.text("Website: www.furnistore.com", 20, y);
  doc.save(`Invoice-${this.order._id}.pdf`);
}
goHome() {
  this.router.navigate(['/']);
}
}