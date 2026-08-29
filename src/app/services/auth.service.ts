import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:5000/api/auth';
  private TOKEN_KEY = 'auth_token';
  private USER_KEY = 'user';

  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getAuthState() {
    return this.authState.asObservable();
  }

  // REGISTER
  register(name: string, email: string, password: string) {
    return this.http.post(`${this.API_URL}/register`, {
      name,
      email,
      password
    });
  }

  // LOGIN
  login(email: string, password: string) {
    return this.http.post<any>(`${this.API_URL}/login`, {
      email,
      password
    });
  }

  // SAVE USER
  saveUser(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, 'loggedin');
    this.authState.next(true);
  }

  // GET USER
  getUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // CHECK LOGIN
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // CHECK ADMIN
  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'admin';
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

}
