import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddauditComponent } from './addaudit.component';

describe('AddauditComponent', () => {
  let component: AddauditComponent;
  let fixture: ComponentFixture<AddauditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddauditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
