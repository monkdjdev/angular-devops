import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareaService } from '../../services/tarea';

@Component({
  selector: 'app-tarea-form',
  imports: [FormsModule],
  templateUrl: './tarea-form.html',
  styleUrl: './tarea-form.scss',
})
export class TareaForm {
  private readonly tareas = inject(TareaService);

  protected readonly titulo = signal('');
  protected readonly error = signal('');

  guardar(): void {
    const creada = this.tareas.agregar(this.titulo());

    if (creada === null) {
      this.error.set('Escribe un titulo para la tarea');
      return;
    }

    this.error.set('');
    this.titulo.set('');
  }
}
