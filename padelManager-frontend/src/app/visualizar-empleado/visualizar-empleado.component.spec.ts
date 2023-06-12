import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarEmpleadoComponent } from './visualizar-empleado.component';

describe('VisualizarEmpleadoComponent', () => {
  let component: VisualizarEmpleadoComponent;
  let fixture: ComponentFixture<VisualizarEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarEmpleadoComponent]
    });
    fixture = TestBed.createComponent(VisualizarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
