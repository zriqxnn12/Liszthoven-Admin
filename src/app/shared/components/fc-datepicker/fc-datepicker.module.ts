import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FcDatepickerComponent } from './fc-datepicker.component';
import { FcDatepickerDialogComponent } from './fc-datepicker-dialog/fc-datepicker-dialog.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [FcDatepickerComponent, FcDatepickerDialogComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    OverlayPanelModule,
    FormsModule,
    CalendarModule,
    DialogModule,
  ],
  exports: [FcDatepickerComponent],
})
export class FcDatepickerModule {}
