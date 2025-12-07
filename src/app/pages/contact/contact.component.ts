import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  isSubmitted = false;
  
  formData = {
    name: '',
    country: '',
    email: '',
    organisation: '',
    message: '',
    lookingFor: '',
    understood: false
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.formData.understood) {
      alert('Please confirm that you understand this form is for collaboration and partnership enquiries only.');
      return;
    }
    
    console.log('Form submitted:', this.formData);
    
    // Show success page
    this.isSubmitted = true;
    
    // Reset form
    this.formData = {
      name: '',
      country: '',
      email: '',
      organisation: '',
      message: '',
      lookingFor: '',
      understood: false
    };
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
