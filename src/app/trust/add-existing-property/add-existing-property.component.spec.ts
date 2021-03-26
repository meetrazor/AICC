import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingPropertyComponent } from './add-existing-property.component';

describe('AddExistingPropertyComponent', () => {
  let component: AddExistingPropertyComponent;
  let fixture: ComponentFixture<AddExistingPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExistingPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExistingPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
