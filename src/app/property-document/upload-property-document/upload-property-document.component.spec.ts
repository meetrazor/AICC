import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPropertyDocumentComponent } from './upload-property-document.component';

describe('UploadPropertyDocumentComponent', () => {
  let component: UploadPropertyDocumentComponent;
  let fixture: ComponentFixture<UploadPropertyDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPropertyDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPropertyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
