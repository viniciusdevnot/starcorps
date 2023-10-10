import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { Todoo } from '../models/Todo';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Form } from '@angular/forms';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private baseApiUrlAll = environment.baseApiUrlAll
  private apiUrlAll = `${this.baseApiUrlAll}`

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}`

  httpOptions = {
    headers: new HttpHeaders({
      'accept': 'text/plain',
      'Content-Type':  'application/json',
      'chave': '7A245EB6-C7A7-4354-AC36-3F8537772766'
    })
  };

  fav = [];
  todoList: Todo[] = [
    {
      id: 1,
      title: 'Todo One',
      isCompleted: false,
      isFavorite: false,
      date: new Date('4-15-2023')
    },
    {
      id: 2,
      title: 'Todo Two',
      isCompleted: false,
      isFavorite: false,
      date: new Date('5-15-2023')
    },
    {
      id: 3,
      title: 'Todo Three',
      isCompleted: false,
      isFavorite: false,
      date: new Date('6-15-2023')
    }
  ];

  constructor(private deletePopup: ToastrService, public http: HttpClient) { }

  createPeople(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData,{headers: this.httpOptions.headers});
    }

  getPeople(): Observable<any> {
    return this.http.get<any>(this.apiUrlAll,{headers: this.httpOptions.headers});
  }

  deletePeople(pessoaId: number) {
    return this.http.delete(`${this.apiUrl}/${pessoaId}`,{headers: this.httpOptions.headers});
  }
  updatePeople(pessoaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${pessoaId}`,{headers: this.httpOptions.headers});
  }




  deleteTodo(item) {
    let index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);

    // this.deletePopup.success(`Todo ${item.id} Deleted!`);
  }

  addTodo(title) {
    let id = this.todoList.length + 2;

    const item: Todo = {
      id: id,
      isCompleted: false,
      isFavorite: false,
      date: new Date(),
      title: title
    }
    this.todoList.unshift(item);
  }


  updateFav(){
    this.fav = JSON.parse(localStorage.getItem('favorite'));
  }
}
