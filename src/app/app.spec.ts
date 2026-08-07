import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra el titulo de la aplicacion', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const h1 = fixture.nativeElement.querySelector('h1') as HTMLElement;

    expect(h1.textContent).toContain('Gestor de tareas');
  });
});
