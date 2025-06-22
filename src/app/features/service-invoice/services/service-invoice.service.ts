import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class ServiceInvoiceService {
  constructor(private http: HttpClient) {}

  getServiceInvoices(
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
    return this.http.get(`${ROOT_API}/admin/service-invoices${param}`);
  }

  getServiceInvoice(id: number) {
    return this.http.get(`${ROOT_API}/admin/service-invoices/${id}`);
  }

  addServiceInvoice(data: any) {
    return this.http.post(`${ROOT_API}/admin/service-invoices`, data);
  }

  updateServiceInvoice(id: number, data: any) {
    return this.http.put(`${ROOT_API}/admin/service-invoices/${id}`, data);
  }

  // manipulation status
  updateStatusToApproved(id: number) {
    return this.http.put(
      `${ROOT_API}/admin/service-invoices/${id}/approve`,
      {}
    );
  }

  updateStatusToCancelled(id: number) {
    return this.http.put(`${ROOT_API}/admin/service-invoices/${id}/cancel`, {});
  }

  deleteServiceInvoice(id: number) {
    return this.http.delete(`${ROOT_API}/admin/service-invoices/${id}`);
  }
}
