import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLayoutComponent } from './doctor-layout.component';

describe('DoctorLayoutComponent', () => {
  let component: DoctorLayoutComponent;
  let fixture: ComponentFixture<DoctorLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorLayoutComponent]
    });
    fixture = TestBed.createComponent(DoctorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
