import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {Todo} from './todo';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private counter = 1;
  private todos: Todo[] = [];
  $todos = new BehaviorSubject<Todo[]>(this.todos);

  constructor(private http: HttpClient) {
  }

  add(text: string) {
    this.http.post('api/v1/todos', {text})
      .subscribe(() => this.notify());
    // this.todos.push({id: this.counter++, text, isCompleted: false});
  }

  getTodos(): void {
    this.http.get<Todo[]>('api/v1/todos')
      .subscribe(todos => {
        this.todos = todos;
        this.$todos.next(todos);
      });
  }

  remove(id: number) {
    this.http.delete(`api/v1/todos/${id}`)
      .subscribe(() => this.notify());
  }

  update(todo: Todo) {
    this.http.put(`api/v1/todos/${todo.id}`, todo)
      .subscribe(() => this.notify());
    // this.todos = this.todos.map(t => t.id === todo.id ? todo : t);
  }

  clearCompleted() {
    console.log('clear completed');
    const removes = this.todos
      .filter(t => t.isCompleted)
      .map(t => {
        console.log('DEL', t.id);
        return this.http.delete(`api/v1/todos/${t.id}`);
      });

    forkJoin(removes)
      .subscribe(results => {
        console.log('all deleted', results);
        this.notify();
      });
  }

  toggleAll() {
    const toggleVal = this.todos.filter(t => t.isCompleted).length !== this.todos.length;
    this.todos = this.todos.map(t => ({...t, isCompleted: toggleVal}));
    this.notify();
  }

  private notify() {
    this.getTodos();
  }
}
