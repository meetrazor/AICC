import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrustViewComponent } from './single-trust-view.component';

describe('SingleTrustViewComponent', () => {
  let component: SingleTrustViewComponent;
  let fixture: ComponentFixture<SingleTrustViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTrustViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTrustViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
