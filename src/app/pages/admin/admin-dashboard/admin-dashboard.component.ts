import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminDashboardService } from './admin-dashboard.service';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, RouterModule] 
})
export class AdminDashboardComponent implements OnInit {

  stats: any = null;
  recentOrders: any[] = [];
  loading: boolean = true;

  constructor(
    private dashboardService: AdminDashboardService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

 
ngOnInit(): void {

  this.loading = true;

  this.dashboardService.getStats().subscribe({
    next: (data: any) => {
      this.stats = data;
      this.cdr.detectChanges();   // 🔥 force refresh
    },
    error: (err) => {
      console.error(err);
    }
  });

  this.dashboardService.getRecentOrders().subscribe({
    next: (data: any) => {
      this.recentOrders = data;
      this.loading = false;
      this.cdr.detectChanges();   // 🔥 force refresh
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
      this.cdr.detectChanges();
    }
  });

}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}

 