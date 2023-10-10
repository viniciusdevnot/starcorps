import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/Todo';
import { Todoo } from 'src/app/models/Todo';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  allPessoas!: Todoo[]
  baseApiUrlAll = environment.baseApiUrlAll

  // @Input() todoInput;
  @Input() todoInput: any;

  completed: boolean = false;
  todo: Todo;

  constructor(public todoService: TodoService, private toasterService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas(){
    this.todoService.getPeople().subscribe(allPessoas => {
      this.allPessoas = allPessoas;
      console.log("entrou", this.allPessoas)
      console.log(allPessoas)
    }, err => {
      console.log('erro ao listas pessoas', err);
    })
  }
   removeHandler(pessoaId: number): void{
      this.todoService.deletePeople(pessoaId).subscribe();
      this.toasterService.success('Pessoa excluida com sucesso');
      setTimeout(()=>{                           // <<<---using ()=> syntax
        window.location.reload();
    }, 1000);


    }

    editForm(){
      this.router.navigate(['/novo']);
    }


  onChange() {
    console.log("changed");
    this.completed = !this.completed;
    this.completed ? this.toasterService.success(`Item selecionado`, 'Feito') : '';
  }

  onCliCk(e) {
    console.log("Clicked");
    console.log(e);
  }

  toggleClass() {
    if (this.completed) {
      // return 'list-item-success';
      return { 'list-group-item-success': this.completed, 'border-primary': this.completed };

    }
  }

  deleteTodo(item) {
    this.todo = item;
    this.todoService.deleteTodo(item);
    this.toasterService.error(`Todo ${item.id} Deleted!`, 'Deleted Successfuly');
  }
  isFavorite() {
    this.todoInput.isFavorite = !this.todoInput.isFavorite;
    if (this.todoInput.isFavorite) {

      this.toasterService.success('Pessoa adicionada a favoritos');

      this.todoService.fav.unshift(this.todoInput);

      localStorage.setItem("favorite", JSON.stringify(this.todoService.fav));

    }
    else {
      this.toasterService.error('Pessoa removida de favoritos');
      let index = this.todoService.todoList.indexOf(this.todo);
      this.todoService.fav.splice(index, 1);

      localStorage.setItem("favorite", JSON.stringify(this.todoService.fav));

    }
  }

}
