import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInquiriesComponent } from './add-inquiries.component';

describe('AddInquiriesComponent', () => {
  let component: AddInquiriesComponent;
  let fixture: ComponentFixture<AddInquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
