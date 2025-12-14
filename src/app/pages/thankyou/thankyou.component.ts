import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TechBackgroundComponent } from '../../components/tech-background/tech-background.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [CommonModule, TechBackgroundComponent, FooterComponent],
  templateUrl: './thankyou.component.html',
  styleUrl: './thankyou.component.css'
})
export class ThankyouComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
