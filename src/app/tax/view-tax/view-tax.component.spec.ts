import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaxComponent } from './view-tax.component';

describe('ViewTaxComponent', () => {
  let component: ViewTaxComponent;
  let fixture: ComponentFixture<ViewTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
