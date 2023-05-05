import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileInquiryComponent } from './add-file-inquiry.component';

describe('AddFileInquiryComponent', () => {
  let component: AddFileInquiryComponent;
  let fixture: ComponentFixture<AddFileInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFileInquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFileInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
