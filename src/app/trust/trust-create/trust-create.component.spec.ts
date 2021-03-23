import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustCreateComponent } from './trust-create.component';

describe('TrustCreateComponent', () => {
  let component: TrustCreateComponent;
  let fixture: ComponentFixture<TrustCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
