import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPartletComponent } from './custom-partlet.component';

describe('CustomPartletComponent', () => {
  let component: CustomPartletComponent;
  let fixture: ComponentFixture<CustomPartletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPartletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPartletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
