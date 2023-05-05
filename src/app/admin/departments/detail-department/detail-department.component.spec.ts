import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDepartmentComponent } from './detail-department.component';

describe('DetailDepartmentComponent', () => {
  let component: DetailDepartmentComponent;
  let fixture: ComponentFixture<DetailDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
