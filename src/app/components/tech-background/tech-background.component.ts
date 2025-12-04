import { Component, Input, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-background.component.html',
  styleUrls: ['./tech-background.component.css']
})
export class TechBackgroundComponent implements AfterViewInit, OnDestroy {
  @Input() variant: 'default' | 'worldmap' = 'default';
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationFrameId?: number;
  private nodes: Node[] = [];
  private ctx?: CanvasRenderingContext2D | null;
  private resizeHandler?: () => void;

  ngAfterViewInit() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    // Set canvas size
    this.setCanvasSize();

    // Create resize handler
    this.resizeHandler = () => this.setCanvasSize();
    window.addEventListener('resize', this.resizeHandler);

    // Initialize network nodes
    this.initNodes();

    // Start animation
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  private setCanvasSize() {
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  private initNodes() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.nodes = [];
    const nodeCount = this.variant === 'worldmap' ? 80 : 60;

    // Define spawn area - starting from outside the screen (negative values)
    const spawnAreaWidth = 200; // Width of spawn area
    const spawnAreaHeight = 200; // Height of spawn area

    for (let i = 0; i < nodeCount; i++) {
      // Start nodes outside the screen (negative positions for top-left)
      const x = -spawnAreaWidth + Math.random() * spawnAreaWidth;
      const y = -spawnAreaHeight + Math.random() * spawnAreaHeight;

      // Create velocity that tends to spread outward (right and down) - very slow speed
      const vx = 0.05 + Math.random() * 0.08; // Very slow positive velocity (moving right)
      const vy = 0.05 + Math.random() * 0.08; // Very slow positive velocity (moving down)

      this.nodes.push({
        x: x,
        y: y,
        vx: vx,
        vy: vy,
      });
    }
  }

  private animate() {
    if (!this.ctx || !this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    // Create fade effect instead of clearing
    ctx.fillStyle = 'rgba(10, 22, 40, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw nodes
    this.nodes.forEach((node, i) => {
      // Move nodes
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off right and bottom edges, wrap around for top and left
      if (node.x > canvas.width) {
        node.vx *= -1;
        node.x = canvas.width;
      }
      if (node.y > canvas.height) {
        node.vy *= -1;
        node.y = canvas.height;
      }

      // Allow nodes to enter from outside (don't bounce at top-left)
      // Only keep nodes that have entered or are still coming in
      if (node.x < -300 || node.y < -300) {
        // Reset node to spawn position if it goes too far out
        node.x = -Math.random() * 200;
        node.y = -Math.random() * 200;
        node.vx = 0.05 + Math.random() * 0.08;
        node.vy = 0.05 + Math.random() * 0.08;
      }

      // Draw connections to other nodes
      this.nodes.forEach((otherNode, j) => {
        if (i === j) return;

        const dx = otherNode.x - node.x;
        const dy = otherNode.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.stroke();
        }
      });

      // Draw node with gradient
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 4);
      gradient.addColorStop(0, 'rgba(212, 175, 55, 0.8)');
      gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw core
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Continue animation
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

