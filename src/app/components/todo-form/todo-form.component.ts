import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Todoo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styles: []
})
export class TodoFormComponent implements OnInit {
  allPeople!: Todoo;
  formCliente: FormGroup;
  @Input() peopleData: Todoo | null = null;

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.formCliente = new FormGroup({

      nome: new FormControl(this.peopleData ? this.peopleData.nome :'', [Validators.required]),
      dataNascimento: new FormControl(this.peopleData ? this.peopleData.dataNascimento :''),
      idade: new FormControl(this.peopleData ? this.peopleData.idade :''),
      email: new FormControl(this.peopleData ? this.peopleData.email :''),
      telefone: new FormControl(this.peopleData ? this.peopleData.telefone :''),
      celular: new FormControl(this.peopleData ? this.peopleData.celular :''),
    });


  }


   onSubmit() {
    let formData;
        formData = this.formCliente.value;
        console.log('testando form', formData)
        this.todoService.createPeople(formData).subscribe(result =>{
        console.log('salvou')
        this.router.navigate(['/']);
       })

  }

  }
