import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceInvoiceDetail } from '@features/service-invoice/interfaces/service-invoice';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-service-invoice-detail-add-dialog',
  templateUrl: './service-invoice-detail-add-dialog.component.html',
  styleUrls: ['./service-invoice-detail-add-dialog.component.css'],
})
export class ServiceInvoiceDetailAddDialogComponent {
  private readonly destroy$: any = new Subject();
  // Icons
  faTimes = faTimes;
  faChevronDown = faChevronDown;

  searchQuery: string = '';
  loading = false;
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;

  title = '';
  currentServiceInvoiceDetail: ServiceInvoiceDetail | undefined;

  serviceInvoiceDetailForm: FormGroup;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    if (this.config.data.title) {
      this.title = this.config.data.title;
    }
    if (this.config.data.currentServiceInvoiceDetail) {
      this.currentServiceInvoiceDetail =
        this.config.data.currentServiceInvoiceDetail;
    }
    this.serviceInvoiceDetailForm = new FormGroup({
      price: new FormControl(0, Validators.required),
      item: new FormControl('', Validators.required),
    });
    if (this.currentServiceInvoiceDetail) {
      // Patch Value
      this.serviceInvoiceDetailForm.patchValue({
        item: this.currentServiceInvoiceDetail.item,
        price: this.currentServiceInvoiceDetail.price,
      });
    }
  }

  ngOnInit(): void {}
  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Validation
  isSubmitAllowed(): boolean {
    if (this.serviceInvoiceDetailForm.valid) {
      return true;
    } else {
      return false;
    }
  }
  onClose() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.serviceInvoiceDetailForm.value);
  }
}
