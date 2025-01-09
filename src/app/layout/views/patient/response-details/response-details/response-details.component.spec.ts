import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseDetailsComponent } from './response-details.component';

describe('ResponseDetailsComponent', () => {
  let component: ResponseDetailsComponent;
  let fixture: ComponentFixture<ResponseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseDetailsComponent]
    });
    fixture = TestBed.createComponent(ResponseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
