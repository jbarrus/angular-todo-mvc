import {Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Todo} from '../todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() removed = new EventEmitter<void>();
  @Output() changed = new EventEmitter<Todo>();
  @ViewChild('editInput') editInput: ElementRef;

  editText = '';
  isEditing: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  startEditing() {
    this.isEditing = true;
    this.editText = this.todo.text;
    setTimeout(() => {
      this.editInput.nativeElement.focus();
    });
  }

  cancelEditing() {
    this.isEditing = false;
  }

  finishEditing() {
    if (this.isEditing) {
      console.log('finish editing', this.editText);
      this.isEditing = false;
      this.changed.emit({...this.todo, text: this.editText});
    }
  }

  remove() {
    this.removed.emit();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log('keydown');
    if (event.key === 'Escape') {
      this.cancelEditing();
    } else if (event.key === 'Enter') {
      this.finishEditing();
    }
  }

  onChecked() {
    this.changed.emit({...this.todo, isCompleted: !this.todo.isCompleted});
    console.log('checked', this.todo);
  }
}
