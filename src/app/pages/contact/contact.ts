import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.html',
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  submitForm() {
    this.http.post('http://localhost:5000/api/contact', this.formData)
      .subscribe({
        next: () => {
          alert('Message sent successfully!');
          this.formData = { name: '', email: '', subject: '', message: '' };
        },
        error: () => {
          alert('Error sending message');
        }
      });
  }
}