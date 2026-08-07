import { Component, inject } from '@angular/core';
import { TareaForm } from '../tarea-form/tarea-form';
import { TareaService } from '../../services/tarea';

@Component({
  selector: 'app-tarea-list',
  imports: [TareaForm],
  templateUrl: './tarea-list.html',
  styleUrl: './tarea-list.scss',
})
export class TareaList {
  private readonly tareas = inject(TareaService);

  protected readonly lista = this.tareas.lista;
  protected readonly total = this.tareas.total;
  protected readonly pendientes = this.tareas.pendientes;

  alternar(id: number): void {
    this.tareas.alternar(id);
  }

  eliminar(id: number): void {
    this.tareas.eliminar(id);
  }

  limpiar(): void {
    this.tareas.limpiarCompletadas();
  }
}
