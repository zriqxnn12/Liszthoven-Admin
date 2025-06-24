import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventAddComponent } from './pages/event-add/event-add.component';
import { EventViewComponent } from './pages/event-view/event-view.component';
import { SharedModule } from '@shared/shared.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcInputNumberModule } from '@shared/components/fc-input-number/fc-input-number.module';
import { FcDatepickerModule } from '@shared/components/fc-datepicker/fc-datepicker.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { FcFilterDialogModule } from '@shared/components/fc-filter-dialog/fc-filter-dialog.module';
import { FcImagePreviewModule } from '@shared/components/fc-image-preview/fc-image-preview.module';

@NgModule({
  declarations: [
    EventComponent,
    EventListComponent,
    EventAddComponent,
    EventViewComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcInputNumberModule,
    FcDatepickerModule,
    FcFileInputModule,
    FcTextareaModule,
    FcFilterDialogModule,
    FcImagePreviewModule,
  ],
})
export class EventModule {}
