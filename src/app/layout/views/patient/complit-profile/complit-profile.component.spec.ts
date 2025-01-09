import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplitProfileComponent } from './complit-profile.component';

describe('ComplitProfileComponent', () => {
  let component: ComplitProfileComponent;
  let fixture: ComponentFixture<ComplitProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplitProfileComponent]
    });
    fixture = TestBed.createComponent(ComplitProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
