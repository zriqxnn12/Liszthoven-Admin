import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-service-invoice-view',
  templateUrl: './service-invoice-view.component.html',
  styleUrls: ['./service-invoice-view.component.css'],
})
export class ServiceInvoiceViewComponent {
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
        // this.submit();
      },
    },
    {
      label: 'Delete',
      icon: faTrash,
      action: () => {
        // this.delete();
      },
    },
  ];

  @Input() serviceInvoice: ServiceInvoice = {} as ServiceInvoice;
  loading = true;
  serviceInvoiceForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private serviceInvoiceService: ServiceInvoiceService
  ) {
    this.serviceInvoice.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Service invoice View',
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
    this.loadData();
  }
  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get serviceInvoiceDetailFormArray(): FormArray {
    return this.serviceInvoiceForm.get('service_invoice_details') as FormArray;
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

  generateServiceInvoiceDetail(serviceInvoiceDetail: any): FormGroup {
    return new FormGroup({
      item: new FormControl(serviceInvoiceDetail.item),
      price: new FormControl(serviceInvoiceDetail.price),
    });
  }

  loadData() {
    this.loading = true;
    this.serviceInvoiceService
      .getServiceInvoice(this.serviceInvoice.id)
      .subscribe((res: any) => {
        this.serviceInvoice = res.data;
        this.serviceInvoiceForm.patchValue({
          status: this.serviceInvoice.status,
          invoice_no: this.serviceInvoice.invoice_no,
          date: this.serviceInvoice.date,
          due_date: this.serviceInvoice.due_date,
          student: this.serviceInvoice.student,
        });
        this.serviceInvoice.service_invoice_details.forEach(
          (serviceInvoice) => [
            this.serviceInvoiceDetailFormArray.push(
              this.generateServiceInvoiceDetail(serviceInvoice)
            ),
          ]
        );
      });
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
  }
}
