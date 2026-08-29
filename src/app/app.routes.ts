import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { HomeComponent } from './pages/home/home';
import { adminGuard } from './guards/admin.guard';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';

export const routes: Routes = [

  // ================= USER WEBSITE =================
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },

      { path: 'shop', loadComponent: () => import('./pages/shop/shop').then(m => m.ShopComponent) },
      { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent) },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.CartComponent) },
      { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutComponent) },

      {
        path: 'thankyou/:id',
        loadComponent: () =>
          import('./pages/thankyou/thankyou')
            .then(m => m.ThankyouComponent)
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('./pages/payment/payment')
            .then(m => m.PaymentComponent)
      },

      { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent) }
    ]
  },

  // ================= ADMIN PANEL =================
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [

      // 🔥 Dashboard as lazy-loaded child (important fix)
      {
        path: '',
        loadComponent: () =>
          import('./pages/admin/admin-dashboard/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent)
      },
    {
  path: 'contacts',
  loadComponent: () =>
    import('./pages/admin/admin-contacts/admin-contacts.component')
      .then(m => m.AdminContactsComponent)
},
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/admin/admin-products/admin-products.component')
            .then(m => m.AdminProductsComponent)
      },

      {
        path: 'add-product',
        loadComponent: () =>
          import('./pages/admin/admin-add-product/admin-add-product.component')
            .then(m => m.AdminAddProductComponent)
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./pages/admin/admin-users/admin-users.component')
            .then(m => m.AdminUsersComponent)
      },

      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/admin/admin-orders/admin-orders.component')
            .then(m => m.AdminOrdersComponent)
      },

      {
        path: 'edit-product/:id',
        loadComponent: () =>
          import('./pages/admin/admin-edit-product/admin-edit-product.component')
            .then(m => m.AdminEditProductComponent)
      }
    ]
  },

  { path: '**', redirectTo: '' }
];