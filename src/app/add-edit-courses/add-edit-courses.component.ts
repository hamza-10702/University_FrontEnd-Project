import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../services/courseService/course.service';
import { CoreSnackbarService } from '../core/core-snackbar.service';

@Component({
  selector: 'app-add-edit-courses',
  templateUrl: './add-edit-courses.component.html',
  styleUrls: ['./add-edit-courses.component.css'],
})
export class AddEditCoursesComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _courseService: CourseService,
    private _modalRef: MatDialogRef<AddEditCoursesComponent>,
    private _snackbar: CoreSnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      subject_name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  addCourse() {
    console.log(this.empForm.value);
    if (this.empForm.valid) {
      if (this.data) {
        this._courseService
          .updatecourseList(this.data.id, this.empForm.value)
          .subscribe({
            next: (value: any) => {
              this._snackbar.openSnackBar(
                'Course Successfully Updated',
                'Done'
              );
              // console.log('Successfully Updated', value);
              this._modalRef.close(true);
            },
            error: (error: any) => {
              this._snackbar.openSnackBar(
                `Course "${error?.error?.error?.parameters[0]}" already exist`,
                'Done'
              );
              // console.error(error);
            },
          });
      } else {
        this._courseService.addcourse(this.empForm.value).subscribe({
          next: (value: any) => {
            this._snackbar.openSnackBar('Course Added Succesfully', 'Done');
            console.log('Successfully Submuitted', value);
            this._modalRef.close(true);
          },
          error: (error: any) => {
            this._snackbar.openSnackBar('Course already exist', 'Done');
            console.error(error);
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
