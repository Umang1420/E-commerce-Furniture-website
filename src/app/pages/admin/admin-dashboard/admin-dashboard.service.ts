import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<any>('http://localhost:5000/api/dashboard/stats');
  }

  getRecentOrders() {
    return this.http.get<any>('http://localhost:5000/api/dashboard/recent-orders');
  }
}