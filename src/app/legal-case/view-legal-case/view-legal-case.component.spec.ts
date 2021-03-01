import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLegalCaseComponent } from './view-legal-case.component';

describe('ViewLegalCaseComponent', () => {
  let component: ViewLegalCaseComponent;
  let fixture: ComponentFixture<ViewLegalCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLegalCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLegalCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
