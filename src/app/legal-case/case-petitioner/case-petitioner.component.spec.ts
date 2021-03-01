import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasePetitionerComponent } from './case-petitioner.component';

describe('CasePetitionerComponent', () => {
  let component: CasePetitionerComponent;
  let fixture: ComponentFixture<CasePetitionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasePetitionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasePetitionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
