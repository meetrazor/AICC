import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItReturnComponent } from './view-it-return.component';

describe('ViewItReturnComponent', () => {
  let component: ViewItReturnComponent;
  let fixture: ComponentFixture<ViewItReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
