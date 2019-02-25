import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Todo} from '../todo.model';
import {TodoFilters} from '../todos-filter.pipe';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {filter, map, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import { DataProxy } from 'apollo-cache';
import {FetchResult} from 'apollo-link';
import {TodosService} from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {
  filter: TodoFilters = 'all';

  $todos: Observable<Todo[]>;
  $incompleteCount: Observable<Number>;
  $completedCount: Observable<Number>;
  $todoCount: Observable<Number>;

  constructor(private route: ActivatedRoute, private todosService: TodosService) {
    this.$todos = todosService.$todos;
    this.$todoCount = todosService.$todoCount;
    this.$incompleteCount = todosService.$incompleteCount;
    this.$completedCount = todosService.$completedCount;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.filter = (params.get('filter') || 'all') as TodoFilters;
    });
  }

  toggleAll() {
    this.todosService.toggleAll();
  }

  onTodoAdded(text: string) {
    this.todosService.add(text);
  }

  onRemoved(todo: Todo) {
    this.todosService.remove(todo.id);
  }

  onChanged(todo: Todo) {
    this.todosService.update(todo);
  }

  clearCompleted() {
    this.todosService.clearCompleted();
  }
}
