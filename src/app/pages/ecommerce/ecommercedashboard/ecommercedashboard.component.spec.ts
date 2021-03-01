import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommercedashboardComponent } from './ecommercedashboard.component';

describe('EcommercedashboardComponent', () => {
  let component: EcommercedashboardComponent;
  let fixture: ComponentFixture<EcommercedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommercedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommercedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
