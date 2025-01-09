import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoldersComponent } from './list-folders.component';

describe('ListFoldersComponent', () => {
  let component: ListFoldersComponent;
  let fixture: ComponentFixture<ListFoldersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFoldersComponent]
    });
    fixture = TestBed.createComponent(ListFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
