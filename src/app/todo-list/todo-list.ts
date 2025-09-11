import { Component } from '@angular/core';
import { TodoInput } from '../todo-input/todo-input';
import { NgFor } from '@angular/common';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoInput, NgFor, TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  tasks: { taskDes: string, status: string }[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    }
  }

  saveTasksToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  onTaskAdded(task: { taskDes: string, status: string }) {
    this.tasks.push(task);
    console.log(this.tasks);
    this.saveTasksToLocalStorage();
  }

  onToggleStatus(task: { taskDes: string, status: string }) {
    task.status = task.status === 'unfinished' ? 'finished' : 'unfinished';
    this.saveTasksToLocalStorage();
  }

  onUpdateTask(updatedTaskDescription: string, taskToUpdate: { taskDes: string, status: string }) {
    const task = this.tasks.find(t => t.taskDes === taskToUpdate.taskDes);
    if (task) {
      task.taskDes = updatedTaskDescription;
      this.saveTasksToLocalStorage();
    }
  }

  onDeleteTask(taskToDelete: { taskDes: string }) {
    this.tasks = this.tasks.filter(task => task.taskDes !== taskToDelete.taskDes);
    this.saveTasksToLocalStorage();
  }
}
