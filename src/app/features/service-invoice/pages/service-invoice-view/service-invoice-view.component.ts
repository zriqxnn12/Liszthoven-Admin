import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env';
import { ServiceInvoiceDetailAddDialogComponent } from '@features/service-invoice/components/service-invoice-detail-add-dialog/service-invoice-detail-add-dialog.component';
import { ServiceInvoice } from '@features/service-invoice/interfaces/service-invoice';
import { ServiceInvoiceService } from '@features/service-invoice/services/service-invoice.service';
import { SelectStudentDialogComponent } from '@features/student/components/select-student-dialog/select-student-dialog.component';
import {
  faCheck,
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
      hidden: true,
      action: () => {
        // this.submit();
      },
    },
    {
      label: 'Approve',
      icon: faCheck,
      hidden: true,
      action: () => {
        this.approveServiceInvoice();
      },
    },
    {
      label: 'Cancel',
      icon: faTimes,
      hidden: true,
      action: () => {
        this.cancel();
      },
    },
    {
      label: 'Delete',
      icon: faTrash,
      hidden: true,
      action: () => {
        this.delete();
      },
    },
  ];

  imageUrl: string = '';
  @Input() serviceInvoice: ServiceInvoice = {} as ServiceInvoice;
  loading = true;
  serviceInvoiceForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private router: Router,
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

  getImageFullUrl(filePath: string): string {
    if (!filePath) return '';
    // sesuaikan base url ini dengan URL API-mu atau public URL penyimpanan file
    return `https://practice1337.s3.ap-southeast-1.amazonaws.com/${filePath}`;
  }

  generateServiceInvoiceDetail(serviceInvoiceDetail: any): FormGroup {
    return new FormGroup({
      item: new FormControl(serviceInvoiceDetail.item),
      price: new FormControl(serviceInvoiceDetail.price),
    });
  }

  generateHeader() {
    this.layoutService.setHeaderConfig({
      title: `Service Invoice (${this.serviceInvoice.status_name})`,
      icon: '',
      showHeader: true,
    });
  }

  generateActionButtons() {
    this.actionButtons[0].hidden = true; // save
    this.actionButtons[1].hidden = true; // approval request
    this.actionButtons[2].hidden = true; // cancel
    this.actionButtons[3].hidden = true; // delete

    switch (this.serviceInvoice.status) {
      case 0: // pending
        this.actionButtons[0].hidden = false;
        this.actionButtons[1].hidden = true;
        this.actionButtons[2].hidden = true;
        this.actionButtons[3].hidden = false;
        break;
      case 1: // approval request
        this.actionButtons[0].hidden = false;
        this.actionButtons[1].hidden = false;
        this.actionButtons[2].hidden = false;
        this.actionButtons[3].hidden = false;
        break;
      case 2: // approved
        break;
      case 3: // cancelled
        break;
      default:
        break;
    }
  }

  loadData() {
    this.loading = true;
    this.serviceInvoiceService
      .getServiceInvoice(this.serviceInvoice.id)
      .subscribe((res: any) => {
        this.loading = false;
        this.serviceInvoice = res.data;
        this.serviceInvoiceForm.patchValue({
          status: this.serviceInvoice.status,
          invoice_no: this.serviceInvoice.invoice_no,
          date: this.serviceInvoice.date,
          due_date: this.serviceInvoice.due_date,
          student: this.serviceInvoice.student,
        });
        // set detail lists
        this.serviceInvoice.service_invoice_details.forEach(
          (serviceInvoice) => [
            this.serviceInvoiceDetailFormArray.push(
              this.generateServiceInvoiceDetail(serviceInvoice)
            ),
          ]
        );
        // Set service invoice document image URL
        this.imageUrl = this.getImageFullUrl(
          this.serviceInvoice.service_invoice_document?.file_path
        );
        console.log(this.imageUrl);
        this.generateHeader();
        this.generateActionButtons();
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

  approveServiceInvoice() {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure to approve this invoice?',
      accept: () => {
        this.actionButtons[1].loading = true;
        this.serviceInvoiceService
          .updateStatusToApproved(this.serviceInvoice.id)
          .subscribe({
            next: (res: any) => {
              this.actionButtons[1].loading = false;
              this.generateActionButtons();
              this.generateHeader();
              this.fcToastService.add({
                severity: 'success',
                header: 'Approve Service Invoice',
                message: res.message,
              });
              this.router.navigate(['/service-invoice/list']);
            },
            error: (err) => {
              this.actionButtons[1].loading = false;
              this.fcToastService.add({
                severity: 'error',
                header: 'fail Approve',
                message: err.message,
              });
            },
          });
      },
    });
  }

  cancel() {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure to cancel this invoice?',
      accept: () => {
        this.actionButtons[2].loading = true;
        this.serviceInvoiceService
          .updateStatusToCancelled(this.serviceInvoice.id)
          .subscribe({
            next: (res: any) => {
              this.actionButtons[2].loading = false;
              this.generateActionButtons();
              this.generateHeader();
              this.fcToastService.add({
                severity: 'success',
                header: 'Approve Service Invoice',
                message: res.message,
              });
              this.router.navigate(['/service-invoice/list']);
            },
            error: (err) => {
              this.actionButtons[2].loading = false;
              this.fcToastService.add({
                severity: 'error',
                header: 'fail to cancel',
                message: err.message,
              });
            },
          });
      },
    });
  }

  delete() {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure to delete this invoice?',
      accept: () => {
        this.actionButtons[3].loading = true;
        this.serviceInvoiceService
          .deleteServiceInvoice(this.serviceInvoice.id)
          .subscribe({
            next: (res: any) => {
              this.actionButtons[3].loading = false;
              this.fcToastService.add({
                severity: 'success',
                header: 'Service invoice deleted',
                message: res.message,
              });
              this.router.navigate(['/service-invoice/list']);
            },
            error: (err) => {
              this.actionButtons[3].loading = false;
              this.fcToastService.clear();
              this.fcToastService.add({
                severity: 'error',
                header: 'error',
                message: err.message,
              });
            },
          });
      },
    });
  }

  // submit() {
  //   this.actionButtons[0].loading = true;
  // }
}
