import {ActionReducerMap, createFeatureSelector, createSelector,} from '@ngrx/store';
import * as fromTodo from './todo.reducer';

export interface State {
  todos: fromTodo.State;
}

export const reducers: ActionReducerMap<State> = {
  todos: fromTodo.reducer,
};

export const selectTodoState = createFeatureSelector<fromTodo.State>('todo');

export const selectAll = createSelector(
  selectTodoState,
  fromTodo.selectAll
);

export const selectCount = createSelector(
  selectTodoState,
  fromTodo.selectTotal
);

export const selectActive = createSelector(
  selectAll,
  todos => todos.filter(t => !t.isCompleted)
);

export const selectCompleted = createSelector(
  selectAll,
  todos => todos.filter(t => t.isCompleted)
);

export const selectActiveCount = createSelector(
  selectActive,
  todos => todos.length
);

export const selectCompletedCount = createSelector(
  selectCompleted,
  todos => todos.length
);

//
// function filteredTodos(filterFn: (todo: Todo) => boolean): (state: State) => Todo[] {
//   return (state: State) => (state.todos.ids as number[])
//     .map(id => state.todos.entities[id])
//     .filter(filterFn);
// }
