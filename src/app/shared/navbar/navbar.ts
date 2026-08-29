import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.cartService.clearCart();
  }

  get user() {
    return this.authService.getUser();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

}
