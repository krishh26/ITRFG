import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-[#0a1628]">
      <nav class="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/80 backdrop-blur-sm border-b border-white/10">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <a routerLink="/" class="text-xl tracking-wide text-white/90">
              ITRF (Global) Ltd
            </a>
            <div class="flex gap-8">
              <a 
                routerLink="/" 
                routerLinkActive="text-[#d4af37]"
                [routerLinkActiveOptions]="{exact: true}"
                class="transition-colors text-white/70 hover:text-white"
              >
                Home
              </a>
              <a 
                routerLink="/about" 
                routerLinkActive="text-[#d4af37]"
                class="transition-colors text-white/70 hover:text-white"
              >
                About Me
              </a>
              <a 
                routerLink="/contact" 
                routerLinkActive="text-[#d4af37]"
                class="transition-colors text-white/70 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'ITRF (Global) Ltd';
}


