import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplelineComponent } from './simpleline.component';

describe('SimplelineComponent', () => {
  let component: SimplelineComponent;
  let fixture: ComponentFixture<SimplelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
