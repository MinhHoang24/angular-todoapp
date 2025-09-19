import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.css'
})
export class TodoInput {
  mess: string = '';
  showWarning: boolean = false;

  @Output() addTask = new EventEmitter<Task>();

  onInputChange() {
    if (this.mess.trim() !== '') {
      this.showWarning = false;
    }
  }
  
  onTaskAdded(): void {
    const value = this.mess.trim();
    if (!value) {
      this.showWarning = true;
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      taskDes: value,
      status: false 
    };

    this.addTask.emit(newTask);
    this.mess = '';
    this.showWarning = false;
  }
}