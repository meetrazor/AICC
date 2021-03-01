import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNoticeComponent } from './public-notice.component';

describe('PublicNoticeComponent', () => {
  let component: PublicNoticeComponent;
  let fixture: ComponentFixture<PublicNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
