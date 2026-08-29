import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(form: NgForm) {

    if (form.invalid) return;

    this.authService.login(this.email, this.password).subscribe({

      next: (user) => {

        // ✅ Save full user object (includes role)
        this.authService.saveUser(user);

        // redirect to home
        this.router.navigate(['/']);

      },

      error: () => {
        this.error = 'Invalid email or password';
      }

    });

  }

}
