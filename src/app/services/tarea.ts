import { Service, computed, signal } from '@angular/core';
import { Tarea } from '../models/tarea';

@Service()
export class TareaService {
  private readonly tareas = signal<Tarea[]>([]);
  private siguienteId = 1;

  readonly lista = this.tareas.asReadonly();
  readonly total = computed(() => this.tareas().length);
  readonly pendientes = computed(() => this.tareas().filter((t) => !t.completada).length);

  agregar(titulo: string): Tarea | null {
    const limpio = titulo.trim();

    if (limpio.length === 0) {
      return null;
    }

    const tarea: Tarea = {
      id: this.siguienteId++,
      titulo: limpio,
      completada: false,
    };

    this.tareas.update((lista) => [...lista, tarea]);

    return tarea;
  }

  alternar(id: number): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }

  eliminar(id: number): void {
    this.tareas.update((lista) => lista.filter((t) => t.id !== id));
  }

  limpiarCompletadas(): void {
    this.tareas.update((lista) => lista.filter((t) => !t.completada));
  }
}
