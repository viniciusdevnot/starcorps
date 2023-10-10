
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';


const routes: Routes = [

{ path: '', component: TodoListComponent },
{ path: 'novo', component: TodoFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
