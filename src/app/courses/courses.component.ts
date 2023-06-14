import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddEditCoursesComponent } from '../add-edit-courses/add-edit-courses.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from '../services/courseService/course.service';
import { CoreSnackbarService } from '../core/core-snackbar.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'subject_name', 'actions'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _openCourseDialog: MatDialog,
    private _courseService: CourseService,
    private _snackbar: CoreSnackbarService
  ) {}

  ngOnInit(): void {
    this.getCourseData();
  }

  getCourseData() {
    this._courseService.getcourseList().subscribe({
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

  deleteCourse(id: number) {
    console.log(typeof id);
    this._courseService.deletecourse(id).subscribe({
      next: (res) => {
        if (res) {
          this._snackbar.openSnackBar('Course Successfully Deleted', 'Done');
          this.getCourseData();
        }
      },
      error: (err) => {
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
    const getRef = this._openCourseDialog.open(AddEditCoursesComponent, {
      data,
    });

    getRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCourseData();
        }
      },
    });
  }

  openCourseDialogue() {
    const getRef = this._openCourseDialog.open(AddEditCoursesComponent);
    getRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCourseData();
        }
      },
    });
  }
}
