import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreturnComponent } from './addreturn.component';

describe('AddreturnComponent', () => {
  let component: AddreturnComponent;
  let fixture: ComponentFixture<AddreturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddreturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
