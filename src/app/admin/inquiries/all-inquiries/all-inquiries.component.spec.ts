import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInquiriesComponent } from './all-inquiries.component';

describe('AllInquiriesComponent', () => {
  let component: AllInquiriesComponent;
  let fixture: ComponentFixture<AllInquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
