import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoArticuloComponent } from './contenido-articulo.component';

describe('ContenidoArticuloComponent', () => {
  let component: ContenidoArticuloComponent;
  let fixture: ComponentFixture<ContenidoArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
