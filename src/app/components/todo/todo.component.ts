import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {
@Input() todoInput;

completed: boolean = false;

constructor(public todoService: TodoService, private deletePopup: ToastrService) { }

  ngOnInit(): void {
  }

  onChange(){
    console.log("changed");
    this.completed = !this.completed;
    this.completed? this.deletePopup.success(`Todo succesfully completed`, 'completed') : '';
  }

  onCliCk(e){
    console.log("Clicked");
    console.log(e);
  }

  toggleClass(){
    if(this.completed){
      // return 'list-item-success';
      return {'list-group-item-success' :this.completed, 'border-primary' :this.completed};

    }
  }

  deleteTodo(item){
    this.todoService.deleteTodo(item);
    this.deletePopup.error(`Todo ${item.id} Deleted!`, 'Deleted Successfuly');
  }

}
