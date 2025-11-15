import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class CourseScheduleService {
  constructor(private http: HttpClient) {}

  getCourseSchedules(
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
    return this.http.get(`${ROOT_API}/admin/course-schedules${param}`);
  }

  addCourseSchedule(data: any) {
    return this.http.post(`${ROOT_API}/admin/course-schedules`, data);
  }

  getCourseSchedule(id: number) {
    return this.http.get(`${ROOT_API}/admin/course-schedules/${id}`);
  }

  deleteCourseSchedule(id: number) {
    return this.http.delete(`${ROOT_API}/admin/course-schedules/${id}`);
  }

  updateStatusToRescheduled(id: number) {
    return this.http.put(
      `${ROOT_API}/admin/course-schedules/${id}/reschedule`,
      {}
    );
  }
}
