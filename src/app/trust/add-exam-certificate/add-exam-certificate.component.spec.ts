import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamCertificateComponent } from './add-exam-certificate.component';

describe('AddExamCertificateComponent', () => {
  let component: AddExamCertificateComponent;
  let fixture: ComponentFixture<AddExamCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExamCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
