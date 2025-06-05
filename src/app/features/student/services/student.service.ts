import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get(`${ROOT_API}/admin/students`);
  }

  getStudent(id: number) {
    return this.http.get(`${ROOT_API}/admin/students/${id}`);
  }

  addStudent(data: any) {
    return this.http.post(`${ROOT_API}/auth/register`, data);
  }
}
