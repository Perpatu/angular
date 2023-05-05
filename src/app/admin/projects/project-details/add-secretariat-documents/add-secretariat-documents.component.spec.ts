import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecretariatDocumentsComponent } from './add-secretariat-documents.component';

describe('AddSecretariatDocumentsComponent', () => {
  let component: AddSecretariatDocumentsComponent;
  let fixture: ComponentFixture<AddSecretariatDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSecretariatDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSecretariatDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
