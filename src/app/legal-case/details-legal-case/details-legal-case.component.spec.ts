import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLegalCaseComponent } from './details-legal-case.component';

describe('DetailsLegalCaseComponent', () => {
  let component: DetailsLegalCaseComponent;
  let fixture: ComponentFixture<DetailsLegalCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsLegalCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLegalCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
