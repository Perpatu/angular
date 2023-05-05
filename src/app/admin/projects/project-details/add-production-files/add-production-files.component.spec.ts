import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductionFilesComponent } from './add-production-files.component';

describe('AddProductionFilesComponent', () => {
  let component: AddProductionFilesComponent;
  let fixture: ComponentFixture<AddProductionFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductionFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductionFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
