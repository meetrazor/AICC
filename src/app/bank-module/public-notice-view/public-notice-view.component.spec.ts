import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNoticeViewComponent } from './public-notice-view.component';

describe('PublicNoticeViewComponent', () => {
  let component: PublicNoticeViewComponent;
  let fixture: ComponentFixture<PublicNoticeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicNoticeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicNoticeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
