import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNoticesComponent } from './public-notices.component';

describe('PublicNoticesComponent', () => {
  let component: PublicNoticesComponent;
  let fixture: ComponentFixture<PublicNoticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicNoticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
