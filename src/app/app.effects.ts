import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AddTodo,
  AddTodoSuccess,
  ClearCompletedTodos,
  DeleteTodo,
  DeleteTodoSuccess,
  LoadTodosSuccess,
  TodoActionTypes,
  ToggleTodos,
  UpdateTodo,
  UpdateTodoSuccess
} from './todo.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EMPTY} from 'rxjs';
import {Todo} from './todo.model';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private http: HttpClient) {
  }

  @Effect() loadTodos = this.actions$
  .pipe(
    ofType(TodoActionTypes.LoadTodos),
    switchMap(() => this.http.get<Todo[]>('/api/v1/todos')
      .pipe(
        map(todos => new LoadTodosSuccess({todos})),
        catchError(() => EMPTY) // TODO handle errors
      )
    )
  );

  @Effect() addTodo = this.actions$
  .pipe(
    ofType<AddTodo>(TodoActionTypes.AddTodo),
    mergeMap(action => this.http.post<Todo>('/api/v1/todos', action.payload.todo)
      .pipe(
        map(todo => new AddTodoSuccess({todo})),
        catchError(() => EMPTY) // TODO handle errors
      )
    )
  );

  @Effect() deleteTodo = this.actions$
  .pipe(
    ofType<DeleteTodo>(TodoActionTypes.DeleteTodo),
    mergeMap(action => this.http.delete<void>(`/api/v1/todos/${action.payload.id}`)
      .pipe(
        map(todo => new DeleteTodoSuccess({id: action.payload.id})),
        catchError(() => EMPTY) // TODO handle errors
      )
    )
  );

  @Effect() updateTodo = this.actions$
  .pipe(
    ofType<UpdateTodo>(TodoActionTypes.UpdateTodo),
    mergeMap(action => this.http.put<Todo>(`/api/v1/todos/${action.payload.update.id}`, action.payload.update.changes)
      .pipe(
        map(todo => new UpdateTodoSuccess({update: {id: todo.id, changes: todo}})),
        catchError(() => EMPTY) // TODO handle errors
      )
    )
  );

  @Effect() toggleTodos = this.actions$
  .pipe(
    ofType<ToggleTodos>(TodoActionTypes.ToggleTodos),
    switchMap(() => this.http.get<Todo[]>('/api/v1/todos')),
    switchMap(todos => {
      const toggleValue = !todos.every(t => t.isCompleted);

      return todos
      .filter(t => t.isCompleted !== toggleValue)
      .map(t => new UpdateTodo({update: {id: t.id, changes: {isCompleted: toggleValue}}}));
    })
  );

  @Effect() clearCompletedTodos = this.actions$
  .pipe(
    ofType<ClearCompletedTodos>(TodoActionTypes.ClearCompletedTodos),
    switchMap(() => this.http.get<Todo[]>('/api/v1/todos')),
    switchMap(todos => todos
      .filter(t => t.isCompleted)
      .map(t => new DeleteTodo({id: t.id}))
    )
  );
}
