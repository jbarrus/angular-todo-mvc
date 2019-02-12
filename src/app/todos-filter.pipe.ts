import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from './todo';

export type TodoFilters = 'All' | 'Active' | 'Completed';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: TodoFilters) {
    console.log('todos filter', todos, filter);
    const res = filter === 'All' ? todos : todos.filter(t => (t.isCompleted && filter === 'Completed') ||
      (!t.isCompleted && filter === 'Active'));
    console.log('res', res);
    return res;
  }

}
