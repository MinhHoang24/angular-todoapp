import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [NgIf],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css'
})
export class TodoItem {
  @Input() task!: Task;

  @Output() toggleStatus = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() updateTask = new EventEmitter<Task>();

  isEditing = false;
  private editedText = '';

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editedText = this.task.taskDes;
    }
  }

  onEditBlur(event?: FocusEvent): void {
    const target = event?.target as HTMLElement | undefined;
    const text = target?.textContent?.trim() ?? this.task.taskDes;
    this.editedText = text;
  }

  onSaveEdit(): void {
    const newText = (this.editedText ?? this.task.taskDes).trim();
    if (newText && newText !== this.task.taskDes) {
      this.updateTask.emit({ ...this.task, taskDes: newText });
    }
    this.isEditing = false;
  }

  onToggleStatus(): void {
    this.toggleStatus.emit(this.task.id);
  }

  onDeleteTask(): void {
    this.deleteTask.emit(this.task.id);
  }
}