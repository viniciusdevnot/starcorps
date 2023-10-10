import { Component, OnInit } from '@angular/core';
//import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Todo, Todoo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: []
})
export class TodoListComponent implements OnInit {
  listarPessoa!: any[];
  lista: any[] = [];

  constructor(public todoService: TodoService, public route: ActivatedRoute) { }

  viewList: boolean = true;


  ngOnInit(): void {
    this.listarPessoas();
    this.route.url.subscribe(data => {
      // console.log(data[0].path);
      if (data[0].path == 'list') {
        this.viewList = true;
      }
      else {
        this.viewList = false;
        this.todoService.updateFav();
        console.log()
      }
    })
  }

  listarPessoas(){
    this.todoService.getPeople().subscribe(allPessoas => {
      this.lista = allPessoas.data;
      console.log("aqui", this.lista)
      console.log(allPessoas)
    }, err => {
      console.log('erro ao listas pessoas', err);
    })
  }

}
