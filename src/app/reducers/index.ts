import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromTodo from '../todo.reducer';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';

export interface State {
  todo: fromTodo.State;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  todo: fromTodo.reducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
