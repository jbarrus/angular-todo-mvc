import { Component, OnInit } from '@angular/core';
import {Todo} from '../todo';
import {TodosService} from '../todos.service';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {TodoFilters} from '../todos-filter.pipe';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  constructor(public todosService: TodosService) { }

  filter: TodoFilters = 'All';

  ngOnInit() {
  }

  onTodoAdded(text: string) {
    console.log('onTodoAdded', text);
    this.todosService.add(text);
  }

  onRemoved(todo: Todo) {
    this.todosService.remove(todo.id);
    // this.todos.splice(this.todos.indexOf(todo), 1);
    console.log('onRemoved', todo);
  }

  onChanged(todo: Todo) {
    this.todosService.update(todo);
    console.log('onChanged', todo);
  }

  clearCompleted() {
    this.todosService.clearCompleted();
    console.log('clear completed');
  }
}
