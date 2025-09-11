import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fe');
}
