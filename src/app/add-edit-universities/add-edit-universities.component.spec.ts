import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUniversitiesComponent } from './add-edit-universities.component';

describe('AddEditUniversitiesComponent', () => {
  let component: AddEditUniversitiesComponent;
  let fixture: ComponentFixture<AddEditUniversitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditUniversitiesComponent]
    });
    fixture = TestBed.createComponent(AddEditUniversitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
