import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodosComponent} from './todos/todos.component';
import {AddTodoComponent} from './add-todo/add-todo.component';
import {FormsModule} from '@angular/forms';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoItemComponent} from './todo-item/todo-item.component';
import {TodosFilterPipe} from './todos-filter.pipe';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    AddTodoComponent,
    TodoListComponent,
    TodoItemComponent,
    TodosFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    GraphQLModule
  ],
  providers: [TodosFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
