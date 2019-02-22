import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from './todo.model';

export type TodoFilters = 'all' | 'active' | 'completed';

export function filterTodos(todos: Todo[], filter: TodoFilters) {
  return !todos || filter === 'all' ? todos : todos.filter(t => (t.isCompleted && filter === 'completed') ||
    (!t.isCompleted && filter === 'active'));
}

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {
  transform = filterTodos;
}
