import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}

  addstudent(data: any): Observable<any> {
    return this._http.post('http://localhost:5002/students', data);
  }

  getstudentList(): Observable<any> {
    return this._http.get('http://localhost:5002/students');
  }

  updatestudentList(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:5002/students/${id}`, data);
  }

  deletestudent(id: number): Observable<any> {
    return this._http.delete(`http://localhost:5002/students/${id}`);
  }
}
