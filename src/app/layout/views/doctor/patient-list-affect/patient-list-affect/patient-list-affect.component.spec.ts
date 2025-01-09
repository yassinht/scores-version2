import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListAffectComponent } from './patient-list-affect.component';

describe('PatientListAffectComponent', () => {
  let component: PatientListAffectComponent;
  let fixture: ComponentFixture<PatientListAffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientListAffectComponent]
    });
    fixture = TestBed.createComponent(PatientListAffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
