import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private _http: HttpClient) {}

  addcourse(data: any): Observable<any> {
    return this._http.post('http://localhost:5002/courses', data);
  }

  getcourseList(): Observable<any> {
    return this._http.get('http://localhost:5002/courses');
  }

  updatecourseList(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:5002/courses/${id}`, data);
  }

  deletecourse(id: number): Observable<any> {
    return this._http.delete(`http://localhost:5002/courses/${id}`);
  }
}
