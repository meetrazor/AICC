import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLegalCaseComponent } from './add-legal-case.component';

describe('AddLegalCaseComponent', () => {
  let component: AddLegalCaseComponent;
  let fixture: ComponentFixture<AddLegalCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLegalCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLegalCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
