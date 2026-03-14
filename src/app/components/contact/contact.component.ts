import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    service: '',
    message: ''
  };

  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitStatus = 'idle';

    // TODO: Connect to backend API to send email
    // For now, just simulate a successful submission
    console.log('Form submitted:', this.formData);

    // Simulate API call
    setTimeout(() => {
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
    }, 1000);

    // When backend is ready, replace the above with:
    /*
    this.http.post('/api/contact', this.formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitStatus = 'success';
        setTimeout(() => {
          this.formData = { name: '', email: '', service: '', message: '' };
          this.submitStatus = 'idle';
        }, 3000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitStatus = 'error';
      }
    });
    */
  }
}
