import { Injectable } from '@angular/core';

export interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

@Injectable({
  providedIn: 'root'
})
export class NodeStateService {
  private nodeState: { [key: string]: Node[] } = {};

  getNodes(variant: string): Node[] | null {
    return this.nodeState[variant] || null;
  }

  setNodes(variant: string, nodes: Node[]): void {
    this.nodeState[variant] = nodes;
  }

  hasNodes(variant: string): boolean {
    return !!this.nodeState[variant] && this.nodeState[variant].length > 0;
  }
}


