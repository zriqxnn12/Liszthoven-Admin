import { Student } from '@features/student/interfaces/student';

export interface ServiceInvoice {
  id: number;
  user_id: number;
  status_name: string;
  invoice_no: string;
  status: number;
  date: string;
  due_date: string;
  grand_total: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  service_invoice_details: ServiceInvoiceDetail[];
  service_invoice_document: ServiceInvoiceDocument;
  student: Student;
}

export interface ServiceInvoiceDetail {
  id: number;
  service_invoice_id: number;
  item: string;
  price: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export interface ServiceInvoiceDocument {
  id: number;
  service_invoice_id: number;
  file_path: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
