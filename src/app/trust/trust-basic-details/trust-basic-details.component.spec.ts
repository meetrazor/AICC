import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustBasicDetailsComponent } from './trust-basic-details.component';

describe('TrustBasicDetailsComponent', () => {
  let component: TrustBasicDetailsComponent;
  let fixture: ComponentFixture<TrustBasicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustBasicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
