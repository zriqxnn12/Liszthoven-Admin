import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceInvoiceDetailAddDialogComponent } from '@features/service-invoice/components/service-invoice-detail-add-dialog/service-invoice-detail-add-dialog.component';
import { ServiceInvoice } from '@features/service-invoice/interfaces/service-invoice';
import { ServiceInvoiceService } from '@features/service-invoice/services/service-invoice.service';
import { SelectStudentDialogComponent } from '@features/student/components/select-student-dialog/select-student-dialog.component';
import {
  faChevronDown,
  faPencil,
  faPlus,
  faSave,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-service-invoice-add',
  templateUrl: './service-invoice-add.component.html',
  styleUrls: ['./service-invoice-add.component.css'],
})
export class ServiceInvoiceAddComponent {
  private readonly destroy$ = new Subject<void>();
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;

  actionButtons: any[] = [
    {
      label: 'Save',
      icon: faSave,
      action: () => {
        this.submit();
      },
    },
  ];

  serviceInvoiceForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private fcFilterDialogService: FcFilterDialogService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private serviceInvoiceService: ServiceInvoiceService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Service Invoice add',
      icon: '',
      showHeader: true,
    });
    this.serviceInvoiceForm = new FormGroup({
      status: new FormControl(0, Validators.required),
      invoice_no: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
      due_date: new FormControl(new Date(), Validators.required),
      grand_total: new FormControl('', Validators.required),
      service_invoice_details: new FormArray([], Validators.required),
      student: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.layoutService.setSearchConfig({ hide: true });
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // select student
  onSelectStudent() {
    const ref = this.dialogService.open(SelectStudentDialogComponent, {
      data: {
        title: 'Select Student',
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '450px',
    });
    ref.onClose.subscribe((student) => {
      if (student) {
        this.serviceInvoiceForm.patchValue({
          student: student,
        });
      }
    });
  }

  removeStudent() {
    this.serviceInvoiceForm.patchValue({
      student: null,
    });
  }

  get serviceInvoiceDetailFormArray(): FormArray {
    return this.serviceInvoiceForm.get('service_invoice_details') as FormArray;
  }

  generateServiceInvoiceDetail(serviceInvoiceDetail: any): FormGroup {
    return new FormGroup({
      item: new FormControl(serviceInvoiceDetail.item),
      price: new FormControl(serviceInvoiceDetail.price),
    });
  }

  get grandTotal(): number {
    return this.serviceInvoiceDetailFormArray.controls.reduce(
      (total, group: any) => {
        const price = parseFloat(group.get('price').value) || 0;
        return total + price;
      },
      0
    );
  }

  addServiceInvoiceDetail() {
    const ref = this.dialogService.open(
      ServiceInvoiceDetailAddDialogComponent,
      {
        data: {
          title: 'Add Service Invoice Detail',
        },
        showHeader: false,
        contentStyle: {
          padding: '0',
        },
        style: {
          overflow: 'hidden',
        },
        styleClass: 'rounded-sm',
        dismissableMask: true,
        width: '450px',
      }
    );
    ref.onClose.subscribe((serviceInvoiceDetail: any) => {
      if (serviceInvoiceDetail) {
        this.serviceInvoiceDetailFormArray.push(
          this.generateServiceInvoiceDetail(serviceInvoiceDetail)
        );
      }
    });
  }

  removeServiceInvoiceDetail(index: number) {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure to delete this data?',
      accept: () => {
        this.serviceInvoiceDetailFormArray.removeAt(index);
      },
    });
  }

  editServiceInvoiceDetail(index: number) {
    const ref = this.dialogService.open(
      ServiceInvoiceDetailAddDialogComponent,
      {
        data: {
          title: 'Edit Service Invoice Detail',
          currentServiceInvoiceDetail:
            this.serviceInvoiceDetailFormArray.value[index],
        },
        showHeader: false,
        contentStyle: {
          padding: '0',
        },
        style: {
          overflow: 'hidden',
        },
        styleClass: 'rounded-sm',
        dismissableMask: true,
        width: '450px',
      }
    );
    ref.onClose.subscribe((serviceInvoiceDetail: any) => {
      if (serviceInvoiceDetail) {
        this.serviceInvoiceDetailFormArray.at(index).patchValue({
          item: serviceInvoiceDetail.item,
          price: serviceInvoiceDetail.price,
        });
      }
    });
  }

  submit() {
    this.actionButtons[0].loading = true;
    const formValue = { ...this.serviceInvoiceForm.value };
    const payload = {
      student_id: formValue.student.id,
      invoice_no: formValue.invoice_no,
      date: formValue.date,
      due_date: formValue.due_date,
      status: formValue.status,
      service_invoice_details: formValue.service_invoice_details.map(
        (detail: any) => ({
          item: detail.item,
          price: detail.price,
        })
      ),
    };

    this.serviceInvoiceService.addServiceInvoice(payload).subscribe({
      next: (res: any) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Service invoice added successfully',
        });
        this.router.navigate(['/service-invoice/list']);
      },
      error: (err) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'error',
          header: 'Error',
          message: err.message,
        });
      },
    });
  }
}
