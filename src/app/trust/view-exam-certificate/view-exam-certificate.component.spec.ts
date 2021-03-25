import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamCertificateComponent } from './view-exam-certificate.component';

describe('ViewExamCertificateComponent', () => {
  let component: ViewExamCertificateComponent;
  let fixture: ComponentFixture<ViewExamCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExamCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExamCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
