import { TestBed } from '@angular/core/testing';
import { TareaService } from './tarea';

describe('TareaService', () => {
  let service: TareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaService);
  });

  it('empieza sin tareas', () => {
    expect(service.total()).toBe(0);
    expect(service.lista()).toEqual([]);
  });

  it('agrega una tarea y le asigna id', () => {
    const tarea = service.agregar('Configurar el pipeline');

    expect(tarea).not.toBeNull();
    expect(tarea?.id).toBe(1);
    expect(tarea?.completada).toBe(false);
    expect(service.total()).toBe(1);
  });

  it('quita los espacios del titulo', () => {
    const tarea = service.agregar('   Revisar el Dockerfile   ');

    expect(tarea?.titulo).toBe('Revisar el Dockerfile');
  });

  it('ignora titulos vacios', () => {
    expect(service.agregar('')).toBeNull();
    expect(service.agregar('    ')).toBeNull();
    expect(service.total()).toBe(0);
  });

  it('asigna ids incrementales', () => {
    service.agregar('Una');
    service.agregar('Otra');

    expect(service.lista().map((t) => t.id)).toEqual([1, 2]);
  });

  it('alterna el estado de una tarea', () => {
    const tarea = service.agregar('Escribir pruebas');

    service.alternar(tarea!.id);
    expect(service.lista()[0].completada).toBe(true);

    service.alternar(tarea!.id);
    expect(service.lista()[0].completada).toBe(false);
  });

  it('no falla al alternar un id que no existe', () => {
    service.agregar('Una tarea');

    service.alternar(99);

    expect(service.lista()[0].completada).toBe(false);
  });

  it('elimina una tarea por id', () => {
    const tarea = service.agregar('Borrar esta');
    service.agregar('Dejar esta');

    service.eliminar(tarea!.id);

    expect(service.total()).toBe(1);
    expect(service.lista()[0].titulo).toBe('Dejar esta');
  });

  it('cuenta las pendientes', () => {
    const primera = service.agregar('Una');
    service.agregar('Otra');

    service.alternar(primera!.id);

    expect(service.pendientes()).toBe(1);
  });

  it('limpia las completadas', () => {
    const primera = service.agregar('Una');
    service.agregar('Otra');
    service.alternar(primera!.id);

    service.limpiarCompletadas();

    expect(service.total()).toBe(1);
    expect(service.lista()[0].titulo).toBe('Otra');
  });
});
