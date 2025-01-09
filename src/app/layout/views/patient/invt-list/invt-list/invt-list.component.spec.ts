import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvtListComponent } from './invt-list.component';

describe('InvtListComponent', () => {
  let component: InvtListComponent;
  let fixture: ComponentFixture<InvtListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvtListComponent]
    });
    fixture = TestBed.createComponent(InvtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
