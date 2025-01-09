import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FodlerPreviewComponent } from './fodler-preview.component';

describe('FodlerPreviewComponent', () => {
  let component: FodlerPreviewComponent;
  let fixture: ComponentFixture<FodlerPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FodlerPreviewComponent]
    });
    fixture = TestBed.createComponent(FodlerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
