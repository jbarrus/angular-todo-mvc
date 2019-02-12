import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  @Output() todoAdded = new EventEmitter<string>();

  addTodo(text: string) {
    this.todoAdded.emit(text);
    return false;
  }
}
