import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { AddEditUniversitiesComponent } from '../add-edit-universities/add-edit-universities.component';
Chart.register(...registerables);

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  barChart!: Chart;
  universityCount: number = 0;
  courseCount: number = 0;
  studentsCount: number = 0;
  universities: any = [];

  constructor(private _uniServices: UniversityService) {}
  ngOnInit(): void {
    this.getDashboardData();
    this.getUniversities();
  }

  getDashboardData() {
    this._uniServices.getDashboardStatistics().subscribe({
      next: (value) => {
        console.log(value);
        this.universityCount = value.data.uniCount;
        this.courseCount = value.data.courseCount;
        this.studentsCount = value.data.studentCount;
        this.initializeBarChart();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getUniversities() {
    this._uniServices.getUniversityList().subscribe({
      next: (value) => {
        this.universities = value.data;
        this.totalRecordbarChart();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  initializeBarChart() {
    const myChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Universities', 'Courses', 'Students'],
        datasets: [
          {
            label: 'Total:',
            data: [this.universityCount, this.courseCount, this.studentsCount],
            backgroundColor: ['Plum', 'SkyBlue', 'LightGrey'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
            barThickness: 100,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  totalRecordbarChart() {
    const label = this.universities?.map((university: any) => university.name);
    const courseData = this.universities?.map(
      (university: any) => university?.courses?.length
    );
    const studentData = this.universities?.map(
      (university: any) => university?.students?.length
    );

    const myChart = new Chart('totalRecords', {
      type: 'bar',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Course Count',
            data: courseData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: 'Students Count',
            data: studentData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
            // Adjust the width of bars within a category (default: 0.9)
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
