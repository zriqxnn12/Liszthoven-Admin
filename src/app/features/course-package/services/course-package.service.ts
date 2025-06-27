import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class CoursePackageService {
  constructor(private http: HttpClient) {}

  getCoursePackages(
    dataListParameter: DataListParameter = {} as DataListParameter
  ) {
    let param = '';
    if (dataListParameter.rows && dataListParameter.page) {
      param = param.concat(
        `?page=${dataListParameter.page}&limit=${dataListParameter.rows}`
      );
    }
    if (dataListParameter.sortBy) {
      param = param.concat('&' + dataListParameter.sortBy);
    }
    if (dataListParameter.filterObj) {
      param = param.concat('&' + dataListParameter.filterObj);
    }

    if (dataListParameter.searchQuery) {
      if (!dataListParameter.sortBy) {
        param = param.concat('?q=' + dataListParameter.searchQuery);
      } else {
        param = param.concat('&q=' + dataListParameter.searchQuery);
      }
    }
    return this.http.get(`${ROOT_API}/admin/course-packages${param}`);
  }

  getCoursePackage(id: number) {
    return this.http.get(`${ROOT_API}/admin/course-packages/${id}`);
  }

  addCoursePackage(data: any) {
    return this.http.post(`${ROOT_API}/admin/course-packages`, data);
  }

  updateCoursePackage(id: number, data: any) {
    return this.http.put(`${ROOT_API}/admin/course-packages/${id}`, data);
  }

  deleteCoursePackage(id: number) {
    return this.http.delete(`${ROOT_API}/admin/course-packages/${id}`);
  }
}
