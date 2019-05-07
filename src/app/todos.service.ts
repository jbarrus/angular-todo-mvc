import { Injectable } from '@angular/core';
import {Todo} from './todo.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';
import {FetchResult} from 'apollo-link';
import {Apollo} from 'apollo-angular';
import { DataProxy } from 'apollo-cache';
import * as _ from 'lodash';

const fetchQuery = gql`
  query allTodos {
    todos {
      id
      text
      isCompleted
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  $todos: Observable<Todo[]>;
  $incompleteCount: Observable<Number>;
  $completedCount: Observable<Number>;
  $todoCount: Observable<Number>;

  constructor(private apollo: Apollo) {
    this.$todos = apollo.watchQuery<{todos: Todo[]}>({
      query: fetchQuery
    }).valueChanges.pipe(map(r => r.data.todos));
    this.$todoCount = this.$todos.pipe(map(t => t.length));
    this.$incompleteCount = this.$todos.pipe(map(todos => todos.filter(t => !t.isCompleted).length));
    this.$completedCount = this.$todos.pipe(map(todos => todos.filter(t => t.isCompleted).length));
  }

  add(text: string): void {
    this.apollo.mutate({
      variables: {
        text
      },
      mutation: gql`
        mutation addTodo($text: String!){
          addTodo(text: $text) {
            id
            text
            isCompleted
          }
        }
      `,
      refetchQueries: ['allTodos']
      // update: (proxy: DataProxy, {data: {addTodo}}: FetchResult) => {
      //   const data: {todos: Todo[]} = proxy.readQuery<{todos: Todo[]}>({query: fetchQuery});
      //   console.log('todos before mutate update', JSON.stringify(data.todos, undefined, '  '));
      //   data.todos = [...data.todos, addTodo];
      //   console.log('todos after mutate update', JSON.stringify(data.todos, undefined, '  '));
      //   proxy.writeQuery({query: fetchQuery, data});
      // }
    }).subscribe();
  }

  remove(id: number): void {
    this.apollo.mutate({
      variables: {
        id
      },
      mutation: gql`
        mutation deleteTodo($id: Int!){
          deleteTodo(id: $id)
        }
      `,
      refetchQueries: ['allTodos']
      // update: (proxy: DataProxy, {data: {deleteTodo}}: FetchResult) => {
      //   const data: {todos: Todo[]} = proxy.readQuery<{todos: Todo[]}>({query: fetchQuery});
      //   data.todos = data.todos.filter(t => t.id !== deleteTodo);
      //   proxy.writeQuery({query: fetchQuery, data});
      // }
    }).subscribe();
  }

  update(todo: Todo): void {
    this.apollo.mutate({
      variables: {
        todo: _.omit(todo, '__typename')
      },
      mutation: gql`
        mutation updateTodo($todo: TodoInput!){
          updateTodo(todo: $todo) {
            id
            text
            isCompleted
          }
        }
      `
    }).subscribe();
  }

  clearCompleted(): void {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          clearCompleted
        }
      `,
      refetchQueries: ['allTodos']
      // update: (proxy: DataProxy, {data: {clearCompleted}}: FetchResult) => {
      //   const clearedIds = clearCompleted as number[];
      //   const data: {todos: Todo[]} = proxy.readQuery<{todos: Todo[]}>({query: fetchQuery});
      //   data.todos = data.todos.filter(t => clearedIds.indexOf(t.id) === -1);
      //   proxy.writeQuery({query: fetchQuery, data});
      // }
    }).subscribe();
  }

  toggleAll(): void {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          toggleAll
        }
      `,
      refetchQueries: fetchQuery // just refresh all, it's likely that many have changed
    }).subscribe();
  }
}
