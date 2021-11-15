import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinaCreateComponent } from './vacina-create.component';

describe('VacinaCreateComponent', () => {
  let component: VacinaCreateComponent;
  let fixture: ComponentFixture<VacinaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacinaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
