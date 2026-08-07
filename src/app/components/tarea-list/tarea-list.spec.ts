import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaList } from './tarea-list';
import { TareaService } from '../../services/tarea';

describe('TareaList', () => {
  let component: TareaList;
  let fixture: ComponentFixture<TareaList>;
  let tareas: TareaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaList],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaList);
    component = fixture.componentInstance;
    tareas = TestBed.inject(TareaService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('avisa cuando no hay tareas', () => {
    const vacio = fixture.nativeElement.querySelector('.vacio') as HTMLElement;

    expect(vacio.textContent).toContain('No hay tareas registradas');
  });

  it('pinta una fila por tarea', async () => {
    tareas.agregar('Primera');
    tareas.agregar('Segunda');
    await fixture.whenStable();

    const filas = fixture.nativeElement.querySelectorAll('.lista li');

    expect(filas.length).toBe(2);
  });

  it('marca la tarea completada al alternarla', async () => {
    const tarea = tareas.agregar('Terminar el informe');
    await fixture.whenStable();

    component.alternar(tarea!.id);
    await fixture.whenStable();

    const fila = fixture.nativeElement.querySelector('.lista li') as HTMLElement;

    expect(fila.classList).toContain('completada');
  });

  it('elimina la tarea', async () => {
    const tarea = tareas.agregar('Sobra');
    await fixture.whenStable();

    component.eliminar(tarea!.id);
    await fixture.whenStable();

    expect(tareas.total()).toBe(0);
    expect(fixture.nativeElement.querySelector('.vacio')).not.toBeNull();
  });

  it('muestra el resumen de pendientes', async () => {
    const primera = tareas.agregar('Una');
    tareas.agregar('Otra');
    tareas.alternar(primera!.id);
    await fixture.whenStable();

    const resumen = fixture.nativeElement.querySelector('.resumen span') as HTMLElement;

    expect(resumen.textContent).toContain('1 de 2 pendientes');
  });

  it('limpia las tareas completadas', async () => {
    const primera = tareas.agregar('Una');
    tareas.agregar('Otra');
    tareas.alternar(primera!.id);
    await fixture.whenStable();

    component.limpiar();
    await fixture.whenStable();

    expect(tareas.total()).toBe(1);
  });
});
