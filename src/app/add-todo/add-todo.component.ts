import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {
  @Output() todoAdded = new EventEmitter<string>();

  addTodo(text: string) {
    if (text) {
      this.todoAdded.emit(text);
      return false;
    }
  }
}
