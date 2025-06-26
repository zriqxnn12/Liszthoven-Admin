import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackListComponent } from './pages/feedback-list/feedback-list.component';
import { FeedbackViewComponent } from './pages/feedback-view/feedback-view.component';
import { SharedModule } from '@shared/shared.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcInputNumberModule } from '@shared/components/fc-input-number/fc-input-number.module';
import { FcDatepickerModule } from '@shared/components/fc-datepicker/fc-datepicker.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { FcFilterDialogModule } from '@shared/components/fc-filter-dialog/fc-filter-dialog.module';
import { FcImagePreviewModule } from '@shared/components/fc-image-preview/fc-image-preview.module';
import { FcTimepickerModule } from '@shared/components/fc-timepicker/fc-timepicker.module';
import { FeedbackComponent } from './feedback.component';

@NgModule({
  declarations: [
    FeedbackComponent,
    FeedbackListComponent,
    FeedbackViewComponent,
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcInputNumberModule,
    FcDatepickerModule,
    FcFileInputModule,
    FcTextareaModule,
    FcFilterDialogModule,
    FcImagePreviewModule,
    FcTimepickerModule,
  ],
})
export class FeedbackModule {}
