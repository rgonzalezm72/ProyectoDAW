import { TestBed } from '@angular/core/testing';

import { CargarArticulosService } from './cargar-articulos.service';

describe('CargarArticulosService', () => {
  let service: CargarArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarArticulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
