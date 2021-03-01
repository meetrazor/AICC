import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmdashboardComponent } from './crmdashboard.component';

describe('CrmdashboardComponent', () => {
  let component: CrmdashboardComponent;
  let fixture: ComponentFixture<CrmdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
