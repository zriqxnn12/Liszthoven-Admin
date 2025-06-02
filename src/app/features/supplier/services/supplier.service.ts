import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { of } from 'rxjs';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  getSuppliers(dataListParameter: DataListParameter = {} as DataListParameter) {
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
    // return this.http.get(`${ROOT_API}/admin/suppliers${param}`);
    return of({
      statusCode: 200,
      message: 'Successfully retrieve suppliers',
      data: {
        count: 5,
        suppliers: [
          {
            id: 9,
            name: 'PT Bangun Properti',
            address: 'Bengkon Indah',
            contact_no: '1029377',
            pic: 'Setiawan',
            tax_no: '1029383',
            total_payable: '0.00',
            created_at: '2023-08-10T08:49:23.000Z',
            updated_at: '2023-08-14T07:52:45.000Z',
            deleted_at: null,
          },
          {
            id: 5,
            name: 'PT produksi angklung',
            address: 'bumi',
            contact_no: '082352323452',
            pic: 'Hooman',
            tax_no: 'string kosong kalau tidak ada',
            total_payable: '0.00',
            created_at: '2023-08-09T04:21:43.000Z',
            updated_at: '2023-08-10T05:19:25.000Z',
            deleted_at: null,
          },
          {
            id: 4,
            name: 'PT produksi kecapi',
            address: 'bumi',
            contact_no: '082352323452',
            pic: 'Hooman',
            tax_no: 'string kosong kalau tidak ada',
            total_payable: '0.00',
            created_at: '2023-08-09T04:20:25.000Z',
            updated_at: '2023-08-14T07:52:57.000Z',
            deleted_at: null,
          },
          {
            id: 3,
            name: 'PT produksi biola',
            address: 'bumi',
            contact_no: '082352323452',
            pic: 'Hooman',
            tax_no: 'string kosong kalau tidak ada',
            total_payable: '0.00',
            created_at: '2023-08-09T04:19:47.000Z',
            updated_at: '2023-08-09T04:19:47.000Z',
            deleted_at: null,
          },
          {
            id: 2,
            name: 'Supplier Gitar',
            address: 'Bengkong',
            contact_no: '08137135123',
            pic: 'Faishal',
            tax_no: '0',
            total_payable: '0.00',
            created_at: '2023-07-05T09:18:13.000Z',
            updated_at: '2023-07-05T09:18:13.000Z',
            deleted_at: null,
          },
        ],
      },
    });
  }
  getSupplier(id: string) {
    // return this.http.get(`${ROOT_API}/admin/suppliers/${id}`);
    return of({
      statusCode: 200,
      message: ' Successfully get supplier',
      data: {
        id: 9,
        name: 'PT Bangun Properti',
        address: 'Bengkon Indah',
        contact_no: '1029377',
        pic: 'Setiawan',
        tax_no: '1029383',
        total_payable: '0.00',
        created_at: '2023-08-10T08:49:23.000Z',
        updated_at: '2023-08-14T07:52:45.000Z',
        deleted_at: null,
        supplier_bank_accounts: [
          {
            id: 5,
            supplier_id: 9,
            account_no: '123123',
            bank: 'BCA',
            swift_code: '123',
            created_at: '2023-08-10T08:54:46.000Z',
            updated_at: '2023-08-10T08:54:46.000Z',
            deleted_at: null,
          },
        ],
      },
    });
  }
  addSupplier(supplier: any) {
    return this.http.post(`${ROOT_API}/admin/suppliers`, supplier);
  }
  updateSupplier(id: string, supplier: any) {
    return this.http.put(`${ROOT_API}/admin/suppliers/${id}`, supplier);
  }
  deleteSupplier(id: string) {
    return this.http.delete(`${ROOT_API}/admin/suppliers/${id}`);
  }
  getSupplierBankAccounts(id: string) {
    return this.http.get(`${ROOT_API}/admin/suppliers/${id}/details`);
  }
  addSupplierBankAccount(id: string, supplierBankAccount: any) {
    return this.http.post(
      `${ROOT_API}/admin/suppliers/${id}/details`,
      supplierBankAccount
    );
  }
  updateSupplierBankAccount(
    id: string,
    supplierBankAccountId: string,
    supplierBankAccount: any
  ) {
    return this.http.put(
      `${ROOT_API}/admin/suppliers/${id}/details/${supplierBankAccountId}`,
      supplierBankAccount
    );
  }
  deleteSupplierBankAccount(id: string, supplierBankAccountId: string) {
    return this.http.delete(
      `${ROOT_API}/admin/suppliers/${id}/details/${supplierBankAccountId}`
    );
  }
}
