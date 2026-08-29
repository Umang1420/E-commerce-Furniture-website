import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// adjust paths if your shared folder is different
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  template: `
    <!-- USER NAVBAR -->
    <app-navbar></app-navbar>

    <!-- PAGE CONTENT -->
    <router-outlet></router-outlet>

    <!-- USER FOOTER -->
    <app-footer></app-footer>
  `
})
export class UserLayoutComponent {}
