import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePVRReportComponent } from './generate-pvr-report.component';

describe('GeneratePVRReportComponent', () => {
  let component: GeneratePVRReportComponent;
  let fixture: ComponentFixture<GeneratePVRReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePVRReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePVRReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
