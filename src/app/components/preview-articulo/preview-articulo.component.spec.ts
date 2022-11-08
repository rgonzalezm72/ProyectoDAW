import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewArticuloComponent } from './preview-articulo.component';

describe('PreviewArticuloComponent', () => {
  let component: PreviewArticuloComponent;
  let fixture: ComponentFixture<PreviewArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
