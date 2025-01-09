import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichPatientComponent } from './fich-patient.component';

describe('FichPatientComponent', () => {
  let component: FichPatientComponent;
  let fixture: ComponentFixture<FichPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichPatientComponent]
    });
    fixture = TestBed.createComponent(FichPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
