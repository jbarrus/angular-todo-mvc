import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromTodo from '../todo.reducer';

export interface State {
  todo: fromTodo.State;
}

export const reducers: ActionReducerMap<State> = {
  todo: fromTodo.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
