import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private http = inject(HttpClient);

  formData = {
    name: '',
    email: '',
    service: '',
    message: ''
  };

  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  // Backend API URL - update this if deploying to production
  private apiUrl = 'http://localhost:3000/api/contact';

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitStatus = 'idle';

    console.log('Submitting form to backend:', this.formData);

    this.http.post<{ success: boolean; message: string }>(this.apiUrl, this.formData).subscribe({
      next: (response) => {
        console.log('Email sent successfully:', response);
        this.isSubmitting = false;
        this.submitStatus = 'success';

        // Reset form after success
        setTimeout(() => {
          this.formData = {
            name: '',
            email: '',
            service: '',
            message: ''
          };
          this.submitStatus = 'idle';
        }, 3000);
      },
      error: (error) => {
        console.error('Error sending email:', error);
        this.isSubmitting = false;
        this.submitStatus = 'error';

        // Clear error message after 5 seconds
        setTimeout(() => {
          this.submitStatus = 'idle';
        }, 5000);
      }
    });
  }
}
