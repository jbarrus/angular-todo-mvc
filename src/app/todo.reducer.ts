import {Todo} from './todo.model';
import {TodoActions, TodoActionTypes} from './todo.actions';
import omit from 'lodash.omit';
import map from 'lodash.map';
import keyBy from 'lodash.keyby';

export interface State {
  ids: number[];
  todos: {[id: number]: Todo};
}

export const initialState: State = {
  ids: [],
  todos: {}
};

export function reducer(
  state = initialState,
  action: TodoActions
): State {
  switch (action.type) {
    case TodoActionTypes.AddTodoSuccess: {
      return {
        ids: [...state.ids, action.payload.todo.id],
        todos: {...state.todos, [action.payload.todo.id]: action.payload.todo}
      };
    }

    case TodoActionTypes.UpdateTodoSuccess: {
      return {
        ...state,
        todos: {...state.todos, [action.payload.todo.id]: action.payload.todo}
      };
    }

    case TodoActionTypes.DeleteTodoSuccess: {
      return {
        ids: state.ids.filter(id => id !== action.payload.id),
        todos: omit(state.todos, action.payload.id)
      };
    }

    case TodoActionTypes.LoadTodosSuccess: {
      return {
        ids: map(action.payload.todos, 'id'),
        todos: keyBy(action.payload.todos, 'id')
      };
    }

    default: {
      return state;
    }
  }
}
