import { Component, signal } from '@angular/core';
import { TodoInput } from './todo-input/todo-input';
import { Task } from './models/task.model';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoInput, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tasks: Task[] = [];

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  onTaskAdded(task: Task): void {
    this.tasks = [...this.tasks, task];
    this.saveTasksToLocalStorage();
    console.log(this.tasks);
  }

  onToggleStatus(id: string): void {
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, status: !t.status } : t
    );
    this.saveTasksToLocalStorage();
  }

  onDeleteTask(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasksToLocalStorage();
  }

  onUpdateTask(updated: Task): void {
    this.tasks = this.tasks.map(t =>
      t.id === updated.id ? { ...t, taskDes: updated.taskDes } : t
    );
    this.saveTasksToLocalStorage();
  }

  private saveTasksToLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  private loadTasksFromLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('tasks');
      if (data) {
        this.tasks = JSON.parse(data);
      }
    }
  }
}