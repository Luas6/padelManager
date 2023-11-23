import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReservasUsuarioComponent } from './listar-reservas-usuario.component';

describe('ListarReservasUsuarioComponent', () => {
  let component: ListarReservasUsuarioComponent;
  let fixture: ComponentFixture<ListarReservasUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarReservasUsuarioComponent]
    });
    fixture = TestBed.createComponent(ListarReservasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
