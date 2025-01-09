import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCreationFormComponent } from './patient-creation-form.component';

describe('PatientCreationFormComponent', () => {
  let component: PatientCreationFormComponent;
  let fixture: ComponentFixture<PatientCreationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientCreationFormComponent]
    });
    fixture = TestBed.createComponent(PatientCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
