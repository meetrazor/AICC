import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDataTableComponent } from './alert-data-table.component';

describe('AlertDataTableComponent', () => {
  let component: AlertDataTableComponent;
  let fixture: ComponentFixture<AlertDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
