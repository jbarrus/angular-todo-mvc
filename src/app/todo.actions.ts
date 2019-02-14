import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Todo } from './todo.model';

export enum TodoActionTypes {
  LoadTodos = '[Todo] Load Todos',
  AddTodo = '[Todo] Add Todo',
  UpdateTodo = '[Todo] Update Todo',
  DeleteTodo = '[Todo] Delete Todo',
  ClearCompletedTodos = '[Todo] Clear Completed Todos',
  ToggleTodos = '[Todo] Toggle Todos',
  LoadTodosSuccess = '[Todo] Load Todos Success',
  AddTodoSuccess = '[Todo] Add Todo Success',
  UpdateTodoSuccess = '[Todo] Update Todo Success',
  DeleteTodoSuccess = '[Todo] Delete Todo Success',
}

export class LoadTodos implements Action {
  readonly type = TodoActionTypes.LoadTodos;

  constructor() {}
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.AddTodo;

  constructor(public payload: { todo: Todo }) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionTypes.UpdateTodo;

  constructor(public payload: { update: Update<Todo> }) {}
}

export class DeleteTodo implements Action {
  readonly type = TodoActionTypes.DeleteTodo;

  constructor(public payload: { id: number }) {}
}

export class ClearCompletedTodos implements Action {
  readonly type = TodoActionTypes.ClearCompletedTodos;
}

export class ToggleTodos implements Action {
  readonly type = TodoActionTypes.ToggleTodos;
}

export class LoadTodosSuccess implements Action {
  readonly type = TodoActionTypes.LoadTodosSuccess;

  constructor(public payload: { todos: Todo[] }) {}
}

export class AddTodoSuccess implements Action {
  readonly type = TodoActionTypes.AddTodoSuccess;

  constructor(public payload: { todo: Todo }) {}
}

export class UpdateTodoSuccess implements Action {
  readonly type = TodoActionTypes.UpdateTodoSuccess;

  constructor(public payload: { update: Update<Todo> }) {}
}

export class DeleteTodoSuccess implements Action {
  readonly type = TodoActionTypes.DeleteTodoSuccess;

  constructor(public payload: { id: number }) {}
}

export type TodoActions =
 LoadTodos
 | AddTodo
 | UpdateTodo
 | DeleteTodo
 | ClearCompletedTodos
 | LoadTodosSuccess
 | AddTodoSuccess
 | UpdateTodoSuccess
 | DeleteTodoSuccess;
