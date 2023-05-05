import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectClientsComponent } from './project-clients.component';

describe('ProjectClientsComponent', () => {
  let component: ProjectClientsComponent;
  let fixture: ComponentFixture<ProjectClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
