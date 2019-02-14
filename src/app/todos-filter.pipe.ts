import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from './todo';

export type TodoFilters = 'all' | 'active' | 'completed';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: TodoFilters) {
    console.log('todos filter', todos, filter);
    const res = filter === 'all' ? todos : todos.filter(t => (t.isCompleted && filter === 'completed') ||
      (!t.isCompleted && filter === 'active'));
    console.log('res', res);
    return res;
  }

}
