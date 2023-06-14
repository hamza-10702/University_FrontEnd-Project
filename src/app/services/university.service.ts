import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  constructor(private _http: HttpClient) {}

  getDashboardStatistics(): Observable<any> {
    return this._http.get('http://localhost:5002/dashboard');
  }
  addUniversity(data: any): Observable<any> {
    return this._http.post('http://localhost:5002/university', data);
  }

  getUniversityList(): Observable<any> {
    return this._http.get('http://localhost:5002/university');
  }

  updateUniversityList(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:5002/university/${id}`, data);
  }

  deleteUniversity(id: number): Observable<any> {
    return this._http.delete(`http://localhost:5002/university/${id}`);
  }
}
