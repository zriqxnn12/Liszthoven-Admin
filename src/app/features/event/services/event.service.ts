import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents(dataListParameter: DataListParameter = {} as DataListParameter) {
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
    return this.http.get(`${ROOT_API}/admin/events${param}`);
  }

  addEvent(data: any) {
    return this.http.post(`${ROOT_API}/admin/events`, data);
  }

  getEvent(id: number) {
    return this.http.get(`${ROOT_API}/admin/events/${id}`);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${ROOT_API}/admin/events/${id}`);
  }

  // find all event participants
  getEventParticipants(
    eventId: number,
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
    return this.http.get(
      `${ROOT_API}/admin/events/${eventId}/participants${param}`
    );
  }

  addEventParticipant(eventId: number, data: any) {
    return this.http.post(
      `${ROOT_API}/admin/events/${eventId}/participants`,
      data
    );
  }

  updateParticipantToAccepted(eventId: number, id: number) {
    return this.http.put(
      `${ROOT_API}/admin/events/${eventId}/participants/${id}/accept`,
      {}
    );
  }

  updateParticipantToRejected(eventId: number, id: number) {
    return this.http.put(
      `${ROOT_API}/admin/events/${eventId}/participants/${id}/reject`,
      {}
    );
  }

  updateParticipantToPaid(eventId: number, id: number) {
    return this.http.put(
      `${ROOT_API}/admin/events/${eventId}/participants/${id}/paid`,
      {}
    );
  }
}
