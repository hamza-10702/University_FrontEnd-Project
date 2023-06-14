import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentsComponent } from '../add-edit-students/add-edit-students.component';
import { StudentService } from '../services/studentService/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreSnackbarService } from '../core/core-snackbar.service';
import { CourseSelectionService } from '../services/course-selection.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'age',
    'email',
    'university',
    'courses',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _openStudentDialog: MatDialog,
    private _studentService: StudentService,
    private _snackbar: CoreSnackbarService,
    private _courseSelectionService: CourseSelectionService
  ) {}

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    this._studentService.getstudentList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteStudent(id: number) {
    this._studentService.deletestudent(id).subscribe({
      next: (res) => {
        if (res) {
          this._snackbar.openSnackBar('Student Successfully Deleted', 'Done');
          this.getStudentData();
        }
      },
      error: (err) => {
        this._snackbar.openSnackBar('Student Successfully Deleted', 'Done');
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    const getRef = this._openStudentDialog.open(AddEditStudentsComponent, {
      data,
    });
    if (data) {
      this._courseSelectionService.setCourseDropdown(data.university.courses);
    }
    getRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentData();
        }
      },
    });
  }

  openStudentDialog() {
    const getRef = this._openStudentDialog.open(AddEditStudentsComponent);
    getRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentData();
        }
      },
    });
  }
}
