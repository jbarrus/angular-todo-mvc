import {Component, OnInit} from '@angular/core';
import {Todo} from '../todo';
import {TodosService} from '../todos.service';
import {TodoFilters} from '../todos-filter.pipe';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {
  }

  filter: TodoFilters = 'All';
  $todos = this.todosService.$todos;
  $incompleteCount = this.$todos.pipe(
    map(todos => todos.filter(t => !t.isCompleted).length)
  );
  $completedCount = this.$todos.pipe(
    map(todos => todos.filter(t => t.isCompleted).length)
  );
  $todoCount = this.$todos.pipe(map(todos => todos.length));

  ngOnInit() {
    this.todosService.getTodos();
  }

  toggleAll() {
    this.todosService.toggleAll();
  }

  onTodoAdded(text: string) {
    console.log('onTodoAdded', text);
    this.todosService.add(text);
  }

  onRemoved(todo: Todo) {
    this.todosService.remove(todo.id);
    // this.todos.splice(this.todos.indexOf(todo), 1);
    console.log('onRemoved', todo);
  }

  onChanged(todo: Todo) {
    this.todosService.update(todo);
    console.log('onChanged', todo);
  }

  clearCompleted() {
    this.todosService.clearCompleted();
    console.log('clear completed');
  }
}
