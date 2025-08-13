// src/types/index.ts
export interface Item {
  id: number;
  text: string;
}

// New types for our structured AI tasks
export type Priority = 'High' | 'Medium' | 'Low';

export interface AITask {
  text: string;
  category: string;
  priority: Priority;
}