import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html'
})
export class ProfileComponent {

  user: any;

  constructor(public authService: AuthService) {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
