import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleClearListComponent } from './title-clear-list.component';

describe('TitleClearListComponent', () => {
  let component: TitleClearListComponent;
  let fixture: ComponentFixture<TitleClearListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleClearListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleClearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
