import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {
@Input() todoInput;

completed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCliCk(){
    this.completed = !this.completed;
  }

  onChange(){

  }

  addClass(){
    if(this.completed){
      return 'list-item-success';
    }
  }

}
