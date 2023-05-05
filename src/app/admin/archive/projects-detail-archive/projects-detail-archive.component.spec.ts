import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDetailArchiveComponent } from './projects-detail-archive.component';

describe('ProjectsDetailArchiveComponent', () => {
  let component: ProjectsDetailArchiveComponent;
  let fixture: ComponentFixture<ProjectsDetailArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsDetailArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsDetailArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
