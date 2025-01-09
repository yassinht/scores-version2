import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormsComponent } from './list-forms.component';

describe('ListFormsComponent', () => {
  let component: ListFormsComponent;
  let fixture: ComponentFixture<ListFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFormsComponent]
    });
    fixture = TestBed.createComponent(ListFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
