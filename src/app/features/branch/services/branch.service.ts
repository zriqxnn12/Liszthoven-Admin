import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  getBranches() {
    return this.http.get(`${ROOT_API}/admin/branches`);
  }

  getBranch(id: number) {
    return this.http.get(`${ROOT_API}/admin/branches/${id}`);
  }

  addBranch(data: any) {
    return this.http.post(`${ROOT_API}/admin/branches`, data);
  }

  updateBranch(id: number, data: any) {
    return this.http.put(`${ROOT_API}/admin/branches/${id}`, data);
  }

  deleteBranch(id: number) {
    return this.http.delete(`${ROOT_API}/admin/branches/${id}`);
  }
}
