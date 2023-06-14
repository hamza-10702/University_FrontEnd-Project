import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../services/courseService/course.service';
import { UniversityService } from '../services/university.service';
import { StudentService } from '../services/studentService/student.service';
import { CoreSnackbarService } from '../core/core-snackbar.service';
import { CourseSelectionService } from '../services/course-selection.service';

@Component({
  selector: 'app-add-edit-students',
  templateUrl: './add-edit-students.component.html',
  styleUrls: ['./add-edit-students.component.css'],
})
export class AddEditStudentsComponent {
  allCoursesDropdown: any = [];
  allUniversityDropdown: any = [];
  selectedItems: any = [];
  // selectedCourse: any = [];

  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _uniService: UniversityService,
    private _courseService: CourseService,
    private _snackbar: CoreSnackbarService,
    private _studentServices: StudentService,
    private _modalRef: MatDialogRef<AddEditStudentsComponent>,
    private _courseDropdown: CourseSelectionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
    this.empForm = this._fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      university: new FormControl('', [Validators.required]),
      courses: new FormControl([], [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.allCoursesDropdown = this._courseDropdown.getCourseDropdown();

    this.getUniversityFromApi();
  }

  getUniversityFromApi() {
    this._uniService.getUniversityList().subscribe({
      next: (value) => {
        this.allUniversityDropdown = value?.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addSelectetdUniversityCourses(event: any) {
    // this._courseDropdown.setCourseDropdown(event?.value?.courses);
    this.allCoursesDropdown = event?.value?.courses;
  }

  compareObjects(option_1: any, option_2: any) {
    return option_1 && option_2 && option_1.id === option_2.id;
  }

  universityCompareObject(option_1: any, option_2: any) {
    if (option_1 && option_2 && option_1.id === option_2.id) {
      this.allCoursesDropdown = option_2.courses;
      console.log(this.allCoursesDropdown);
      return true;
    } else {
      return false;
    }
  }
  addStudent() {
    console.log(this.empForm.value);
    if (this.empForm.valid) {
      if (this.data) {
        this._studentServices
          .updatestudentList(this.data.id, this.empForm.value)
          .subscribe({
            next: (value: any) => {
              this._snackbar.openSnackBar(
                'Course Successfully Updated',
                'Done'
              );
              console.log('Successfully Updated', value);
              this._modalRef.close(true);
            },
            error: (error: any) => {
              console.error(error);
            },
          });
      } else {
        this._studentServices.addstudent(this.empForm.value).subscribe({
          next: (value: any) => {
            this._snackbar.openSnackBar('Student Added Succesfully', 'Done');
            console.log('Successfully Submuitted', value);
            this._modalRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          },
        });
      }
    }
  }
}
