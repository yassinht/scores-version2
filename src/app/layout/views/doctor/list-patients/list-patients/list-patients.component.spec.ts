import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatientsComponent } from './list-patients.component';

describe('ListPatientsComponent', () => {
  let component: ListPatientsComponent;
  let fixture: ComponentFixture<ListPatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPatientsComponent]
    });
    fixture = TestBed.createComponent(ListPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
