import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteCreateComponent } from './lote-create.component';

describe('LoteCreateComponent', () => {
  let component: LoteCreateComponent;
  let fixture: ComponentFixture<LoteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoteCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
