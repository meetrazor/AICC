import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFilterDocumentsComponent } from './view-filter-documents.component';

describe('ViewFilterDocumentsComponent', () => {
  let component: ViewFilterDocumentsComponent;
  let fixture: ComponentFixture<ViewFilterDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFilterDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFilterDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
