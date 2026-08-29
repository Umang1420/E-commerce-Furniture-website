import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API_URL = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.API_URL, orderData);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  confirmPayment(orderId: string): Observable<any> {
    return this.http.put<any>(
      `${this.API_URL}/confirm/${orderId}`,
      {}
    );
  }

  getOrderById(orderId: string) {
  return this.http.get<any>(
    `http://localhost:5000/api/orders/${orderId}`
  );
}
}