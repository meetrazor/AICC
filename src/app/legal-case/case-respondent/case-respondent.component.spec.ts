import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRespondentComponent } from './case-respondent.component';

describe('CaseRespondentComponent', () => {
  let component: CaseRespondentComponent;
  let fixture: ComponentFixture<CaseRespondentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseRespondentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRespondentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
