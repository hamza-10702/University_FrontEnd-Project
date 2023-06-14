import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseSelectionService {
  private courseDropdown: any = [];

  setCourseDropdown(data: any[]) {
    this.courseDropdown = data;
  }

  getCourseDropdown() {
    return this.courseDropdown;
  }

  constructor() {}
}
