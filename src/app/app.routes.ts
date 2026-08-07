import { Routes } from '@angular/router';
import { TareaList } from './components/tarea-list/tarea-list';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: 'tareas', component: TareaList, title: 'Tareas' },
  { path: '**', redirectTo: 'tareas' },
];
