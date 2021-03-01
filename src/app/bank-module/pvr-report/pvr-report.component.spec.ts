import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvrReportComponent } from './pvr-report.component';

describe('PvrReportComponent', () => {
  let component: PvrReportComponent;
  let fixture: ComponentFixture<PvrReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvrReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
