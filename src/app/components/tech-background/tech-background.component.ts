import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-background.component.html',
  styleUrls: ['./tech-background.component.css']
})
export class TechBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() variant: string = 'default';
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private animationFrameId?: number;
  private particles: Particle[] = [];
  private ctx?: CanvasRenderingContext2D | null;

  ngOnInit() {
    // Initialize particles
    this.initParticles();
  }

  ngAfterViewInit() {
    if (this.canvasRef) {
      const canvas = this.canvasRef.nativeElement;
      this.ctx = canvas.getContext('2d');
      this.resizeCanvas();
      this.animate();
      
      // Handle window resize
      window.addEventListener('resize', this.resizeCanvas.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }

  private initParticles() {
    // Use more particles for better visual effect
    const particleCount = this.variant === 'worldmap' ? 120 : 100;
    this.particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
        vx: (Math.random() - 0.5) * (this.variant === 'worldmap' ? 0.2 : 0.3),
        vy: (Math.random() - 0.5) * (this.variant === 'worldmap' ? 0.2 : 0.3),
        radius: Math.random() * 2 + 1
      });
    }
  }

  private resizeCanvas() {
    if (this.canvasRef) {
      const canvas = this.canvasRef.nativeElement;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  private animate() {
    if (!this.ctx || !this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    this.particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around screen
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Draw particle with glow effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
      ctx.fill();

      // Add glow
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius + 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.fill();

      // Draw connections
      this.particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          const opacity = 0.3 * (1 - distance / 200);
          ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    // Continue animation
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

