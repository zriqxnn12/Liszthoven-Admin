import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FcInputTelComponent } from './fc-input-tel.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FcDialogModule } from '../fc-dialog/fc-dialog.module';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [FcInputTelComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    FcDialogModule,
    InputTextModule,
  ],
  exports: [FcInputTelComponent],
})
export class FcInputTelModule {}
