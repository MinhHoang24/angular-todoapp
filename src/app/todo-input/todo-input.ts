import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

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

  @Output() addTask = new EventEmitter<{ taskDes: string, status: string }>();

  onInputChange() {
    if (this.mess.trim() !== '') {
      this.showWarning = false;
    }
  }

  addTaskToList() {
    if (this.mess.trim() !== '') {
      this.addTask.emit({ taskDes: this.mess, status: 'unfinished' });
      console.log('Add new task: ', this.mess);
      this.mess = '';
      this.showWarning = false;
    } else {
      console.log('Please enter a task');
      this.showWarning = true;
      console.log('Field is required');
    }
  }
}