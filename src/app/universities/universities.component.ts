import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditUniversitiesComponent } from '../add-edit-universities/add-edit-universities.component';
import { MatDialog } from '@angular/material/dialog';
import { UniversityService } from '../services/university.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreSnackbarService } from '../core/core-snackbar.service';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css'],
})
export class UniversitiesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'contact',
    'Courses',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _openUniModal: MatDialog,
    private _uniService: UniversityService,
    private _snackbar: CoreSnackbarService
  ) {}

  ngOnInit(): void {
    this.getUniversityData();
  }

  getUniversityData() {
    this._uniService.getUniversityList().subscribe({
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

  deleteUniversity(id: number) {
    console.log(typeof id);
    this._uniService.deleteUniversity(id).subscribe({
      next: (res) => {
        if (res) {
          this._snackbar.openSnackBar(
            'University Successfully Deleted',
            'Done'
          );
          this.getUniversityData();
        }
      },
      error: (err) => {
        this._snackbar.openSnackBar(
          "Can't deleted! University have students, First deelete all students",
          'Done'
        );
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
    const getRef = this._openUniModal.open(AddEditUniversitiesComponent, {
      data,
    });

    getRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUniversityData();
        }
      },
    });
  }

  openUniversityDialogue() {
    const getRef = this._openUniModal.open(AddEditUniversitiesComponent);
    getRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUniversityData();
        }
      },
    });
  }
}
