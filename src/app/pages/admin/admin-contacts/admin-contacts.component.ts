import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.css'],
  imports: [CommonModule]
})
export class AdminContactsComponent implements OnInit {

  contacts: any[] = [];

 constructor(
  private http: HttpClient,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
  console.log("Contacts Component Loaded");
  this.loadContacts();
}

loadContacts() {
  this.http.get<any>('http://localhost:5000/api/contact')
    .subscribe({
      next: (data) => {
        console.log("API DATA:", data);
        this.contacts = data;
        this.cdr.detectChanges();   // 🔥 FORCE VIEW UPDATE
      },
      error: (err) => console.error(err)
    });
}

deleteContact(id: string) {

  if (!confirm('Are you sure you want to delete this request?')) {
    return;
  }

  this.http.delete(`http://localhost:5000/api/contact/${id}`)
    .subscribe({
      next: () => {

        // Remove item from array
        this.contacts = this.contacts.filter(c => c._id !== id);

        // 🔥 Force Angular to update UI immediately
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
}
}