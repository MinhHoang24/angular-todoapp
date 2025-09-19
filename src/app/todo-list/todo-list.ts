import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { TodoItem } from './todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [NgFor, TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  @Input() tasks: Task[] = [];

  @Output() toggleStatus = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() updateTask = new EventEmitter<Task>();

  onToggleStatus(id: string): void {
    this.toggleStatus.emit(id);
  }
  
  onDeleteTask(id: string): void {
    this.deleteTask.emit(id);
  }

  onUpdateTask(updated: Task): void {
    this.updateTask.emit(updated);
  }
}