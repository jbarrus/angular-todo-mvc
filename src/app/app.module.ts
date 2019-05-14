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
import {GraphQLModule} from './graphql.module';
import {NgxLoadingModule} from 'ngx-loading';

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
    GraphQLModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [TodosFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
