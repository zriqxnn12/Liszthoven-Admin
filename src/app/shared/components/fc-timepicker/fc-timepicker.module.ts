import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FcTimepickerComponent } from './fc-timepicker.component';

@NgModule({
  declarations: [FcTimepickerComponent],
  imports: [CommonModule, FontAwesomeModule, OverlayPanelModule, FormsModule],
  exports: [FcTimepickerComponent],
})
export class FcTimepickerModule {}
