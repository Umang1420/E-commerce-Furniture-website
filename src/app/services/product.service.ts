import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  // ✅ GET ALL PRODUCTS
  getProducts() {
    return this.http.get<any[]>(this.API);
  }

  // ✅ GET SINGLE PRODUCT
  getProductById(id: string) {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  // ✅ ADD PRODUCT
  addProduct(data: any) {
    return this.http.post(this.API, data);
  }

  // ✅ UPDATE PRODUCT
  updateProduct(id: string, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  // ✅ DELETE PRODUCT
  deleteProduct(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
