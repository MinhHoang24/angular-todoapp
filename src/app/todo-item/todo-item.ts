import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css'
})
export class TodoItem {
  @Input() task!: { taskDes: string, status: string };

  @Output() toggleStatus = new EventEmitter<void>();
  @Output() deleteTask = new EventEmitter<void>();
  @Output() updateTask = new EventEmitter<string>();

  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onSaveEdit() {
    this.updateTask.emit(this.task.taskDes);
    this.isEditing = false;
  }

  onEditBlur() {
    if (this.isEditing) {
      this.updateTask.emit(this.task.taskDes);
      this.isEditing = false;
    }
  }

  onDeleteTask() {
    this.deleteTask.emit();
  }

  onToggleStatus() {
    this.toggleStatus.emit();
  }
}
