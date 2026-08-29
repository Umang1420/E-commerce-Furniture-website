import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(`${this.API}/users`);
  }

}
