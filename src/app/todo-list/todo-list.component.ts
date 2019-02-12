import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];
  @Output() removed = new EventEmitter<Todo>();
  @Output() changed = new EventEmitter<Todo>();
  @Output() toggleAllClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
