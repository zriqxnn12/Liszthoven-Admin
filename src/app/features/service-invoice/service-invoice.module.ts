import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceInvoiceRoutingModule } from './service-invoice-routing.module';
import { ServiceInvoiceComponent } from './service-invoice.component';
import { ServiceInvoiceListComponent } from './pages/service-invoice-list/service-invoice-list.component';
import { ServiceInvoiceAddComponent } from './pages/service-invoice-add/service-invoice-add.component';
import { ServiceInvoiceViewComponent } from './pages/service-invoice-view/service-invoice-view.component';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { FcImagePreviewModule } from '@shared/components/fc-image-preview/fc-image-preview.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { FcInputNumberModule } from '@shared/components/fc-input-number/fc-input-number.module';
import { FcDatepickerModule } from '@shared/components/fc-datepicker/fc-datepicker.module';
import { FcSelectOptionModule } from '@shared/components/fc-select-option/fc-select-option.module';
import { SharedModule } from '@shared/shared.module';
import { ServiceInvoiceDetailAddDialogComponent } from './components/service-invoice-detail-add-dialog/service-invoice-detail-add-dialog.component';

@NgModule({
  declarations: [
    ServiceInvoiceComponent,
    ServiceInvoiceListComponent,
    ServiceInvoiceAddComponent,
    ServiceInvoiceViewComponent,
    ServiceInvoiceDetailAddDialogComponent,
  ],
  imports: [
    CommonModule,
    ServiceInvoiceRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcTextareaModule,
    FcImagePreviewModule,
    FcFileInputModule,
    FcInputNumberModule,
    FcDatepickerModule,
    FcSelectOptionModule,
  ],
})
export class ServiceInvoiceModule {}
