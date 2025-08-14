export interface Item {
  id: number;
  text: string;
}

// types for my structured AI tasks
export type Priority = 'High' | 'Medium' | 'Low';

export interface AITask {
  text: string;
  category: string;
  priority: Priority;
}