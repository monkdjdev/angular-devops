import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaForm } from './tarea-form';
import { TareaService } from '../../services/tarea';

describe('TareaForm', () => {
  let component: TareaForm;
  let fixture: ComponentFixture<TareaForm>;
  let tareas: TareaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaForm);
    component = fixture.componentInstance;
    tareas = TestBed.inject(TareaService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('guarda la tarea escrita en el input', async () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'Configurar SonarCloud';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(tareas.total()).toBe(1);
    expect(tareas.lista()[0].titulo).toBe('Configurar SonarCloud');
  });

  it('limpia el input despues de guardar', async () => {
    component.guardar();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'Otra tarea';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    component.guardar();
    await fixture.whenStable();

    expect(input.value).toBe('');
  });

  it('muestra un error si el titulo esta vacio', async () => {
    component.guardar();
    await fixture.whenStable();

    const error = fixture.nativeElement.querySelector('.error') as HTMLElement;
    expect(error.textContent).toContain('Escribe un titulo');
    expect(tareas.total()).toBe(0);
  });
});
