import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFileComponent } from './comment-file.component';

describe('CommentFileComponent', () => {
  let component: CommentFileComponent;
  let fixture: ComponentFixture<CommentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
