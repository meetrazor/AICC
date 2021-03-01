import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleClearCompleteComponent } from './title-clear-complete.component';

describe('TitleClearCompleteComponent', () => {
  let component: TitleClearCompleteComponent;
  let fixture: ComponentFixture<TitleClearCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleClearCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleClearCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
