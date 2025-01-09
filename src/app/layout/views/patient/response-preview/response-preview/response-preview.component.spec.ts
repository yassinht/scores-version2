import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsePreviewComponent } from './response-preview.component';

describe('ResponsePreviewComponent', () => {
  let component: ResponsePreviewComponent;
  let fixture: ComponentFixture<ResponsePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsePreviewComponent]
    });
    fixture = TestBed.createComponent(ResponsePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
