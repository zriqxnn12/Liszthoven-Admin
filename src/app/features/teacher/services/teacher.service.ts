import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getTeachers() {
    return this.http.get(`${ROOT_API}/admin/teachers`);
  }
}
