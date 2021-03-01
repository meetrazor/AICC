import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraluiComponent } from './generalui.component';

describe('GeneraluiComponent', () => {
  let component: GeneraluiComponent;
  let fixture: ComponentFixture<GeneraluiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneraluiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraluiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
