import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: any[] = [];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {

    this.userService.getUsers().subscribe({

      next: (data: any[]) => {

        console.log("USERS FROM API:", data);

        this.users = data;

        this.cdr.detectChanges(); // 🔥 force UI update

      },

      error: (err) => {

        console.error("USER LOAD ERROR:", err);

      }

    });

  }

}
