import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustPropertiesComponent } from './trust-properties.component';

describe('TrustPropertiesComponent', () => {
  let component: TrustPropertiesComponent;
  let fixture: ComponentFixture<TrustPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
