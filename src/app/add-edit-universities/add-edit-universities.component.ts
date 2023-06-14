import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { UniversityService } from '../services/university.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../services/courseService/course.service';
import { CoreSnackbarService } from '../core/core-snackbar.service';

@Component({
  selector: 'app-add-edit-universities',
  templateUrl: './add-edit-universities.component.html',
  styleUrls: ['./add-edit-universities.component.css'],
})
export class AddEditUniversitiesComponent implements OnInit {
  allCoursesDropdown: any = [];
  // selectedCourse: any = [];
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _uniService: UniversityService,
    private _snackbar: CoreSnackbarService,
    private _courseService: CourseService,
    private _modalRef: MatDialogRef<AddEditUniversitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(this.data);

    this.empForm = this._fb.group({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      courses: new FormControl([]),
      dynamicFields: this._fb.array([]),
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.getCoursesfromApi();
  }

  get dynamicFields(): FormArray {
    return this.empForm.get('dynamicFields') as FormArray;
  }

  createDynamicField(): FormGroup {
    return this._fb.group({
      newCourses: '',
    });
  }

  addDynamicField() {
    this.dynamicFields.push(this.createDynamicField());
  }

  removeDynamicField(index: number) {
    this.dynamicFields.removeAt(index);
  }

  getCoursesfromApi() {
    this._courseService.getcourseList().subscribe({
      next: (value) => {
        this.allCoursesDropdown = value.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  compareObjects(option_1: any, option_2: any) {
    return option_1 && option_2 && option_1.id === option_2.id;
  }

  addUniversity() {
    console.log(this.empForm.value);
    if (this.empForm.valid) {
      if (this.data) {
        this._uniService
          .updateUniversityList(this.data.id, this.empForm.value)
          .subscribe({
            next: (value: any) => {
              this._snackbar.openSnackBar(
                'University Successfully Updated',
                'Done'
              );
              console.log('Successfully Updated', value);
              this._modalRef.close(true);
            },
            error: (error: any) => {
              this._snackbar.openSnackBar(
                `Course "${error?.error?.error?.parameters[0]}" already exist`,
                'Done'
              );
            },
          });
      } else {
        this._uniService.addUniversity(this.empForm.value).subscribe({
          next: (value: any) => {
            this._snackbar.openSnackBar('University Added Succesfully', 'Done');
            // console.log('Successfully Submuitted', value);
            this._modalRef.close(true);
          },
          error: (error: any) => {
            this._snackbar.openSnackBar(
              `Course "${error?.error?.error?.parameters[0]}" already exist`,
              'Done'
            );
          },
        });
      }
    }
  }
}
