import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNoAutorizadoComponent } from './pagina-no-autorizado.component';

describe('PaginaNoAutorizadoComponent', () => {
  let component: PaginaNoAutorizadoComponent;
  let fixture: ComponentFixture<PaginaNoAutorizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaNoAutorizadoComponent]
    });
    fixture = TestBed.createComponent(PaginaNoAutorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
