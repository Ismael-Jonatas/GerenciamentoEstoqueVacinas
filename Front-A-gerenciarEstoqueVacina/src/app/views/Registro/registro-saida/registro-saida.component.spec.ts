import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSaidaComponent } from './registro-saida.component';

describe('RegistroSaidaComponent', () => {
  let component: RegistroSaidaComponent;
  let fixture: ComponentFixture<RegistroSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
