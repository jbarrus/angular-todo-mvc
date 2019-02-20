import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Todo} from '../todo.model';
import {TodoFilters} from '../todos-filter.pipe';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {Observable} from 'rxjs';
import {selectActiveCount, selectAll, selectCompletedCount, selectCount} from '../todo.selectors';
import {AddTodo, ClearCompletedTodos, DeleteTodo, LoadTodos, ToggleTodos, UpdateTodo} from '../todo.actions';

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

  constructor(private route: ActivatedRoute, private store: Store<State>) {
    this.$todos = store.select(selectAll);
    this.$incompleteCount = store.select(selectActiveCount);
    this.$completedCount = store.select(selectCompletedCount);
    this.$todoCount = store.select(selectCount);
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodos());

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.filter = (params.get('filter') || 'all') as TodoFilters;
    });
  }

  toggleAll() {
    this.store.dispatch(new ToggleTodos());
  }

  onTodoAdded(text: string) {
    this.store.dispatch(new AddTodo({todo: {text}}));
  }

  onRemoved(todo: Todo) {
    this.store.dispatch(new DeleteTodo({id: todo.id}));
  }

  onChanged(todo: Todo) {
    this.store.dispatch(new UpdateTodo({todo}));
  }

  clearCompleted() {
    this.store.dispatch(new ClearCompletedTodos());
  }
}
