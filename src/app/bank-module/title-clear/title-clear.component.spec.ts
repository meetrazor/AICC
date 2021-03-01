import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleClearComponent } from './title-clear.component';

describe('TitleClearComponent', () => {
  let component: TitleClearComponent;
  let fixture: ComponentFixture<TitleClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
