import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDocumentsComponent } from './case-documents.component';

describe('CaseDocumentsComponent', () => {
  let component: CaseDocumentsComponent;
  let fixture: ComponentFixture<CaseDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
