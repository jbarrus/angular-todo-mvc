import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Todo} from './todo';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private counter = 1;
  private todos: Todo[] = [];
  $todos = new BehaviorSubject<Todo[]>(this.todos);
  $incompleteCount = this.$todos.pipe(
    map(todos => todos.filter(t => !t.isCompleted).length));

  constructor() { }

  add(text: string) {
    this.todos.push({id: this.counter++, text, isCompleted: false});
    this.notify();
  }

  remove(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.notify();
  }

  update(todo: Todo) {
    this.todos = this.todos.map(t => t.id === todo.id ? todo : t);
    this.notify();
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.isCompleted);
    this.notify();
  }

  toggleAll() {
    const toggleVal = this.todos.filter(t => t.isCompleted).length !== this.todos.length;
    this.todos = this.todos.map(t => ({...t, isCompleted: toggleVal}));
    this.notify();
  }

  private notify() {
    this.$todos.next(this.todos);
  }
}
