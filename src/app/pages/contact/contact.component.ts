import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TechBackgroundComponent } from '../../components/tech-background/tech-background.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TechBackgroundComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  isSubmitting = false;

  formData = {
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    organisation: '',
    message: '',
    lookingFor: '',
    understood: false
  };

  private apiUrl = 'https://api.itrfg.com/contact';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    if (!this.formData.understood) {
      alert('Please confirm that you understand this form is for collaboration and partnership enquiries only.');
      return;
    }

    // Prevent multiple submissions
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    // Prepare API payload
    const payload = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
      country: this.formData.country,
      organisation: this.formData.organisation,
      lookingFor: this.formData.lookingFor,
      message: this.formData.message
    };

    // Call API
    this.http.post(this.apiUrl, payload).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        this.isSubmitting = false;
        // Reset form
        this.resetForm();
        // Navigate to thank you page
        this.router.navigate(['/thankyou']);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        this.isSubmitting = false;
        alert('There was an error submitting your form. Please try again later.');
      }
    });
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      country: '',
      email: '',
      organisation: '',
      message: '',
      lookingFor: '',
      understood: false
    };
  }
}
