import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FcTextareaComponent } from './fc-textarea.component';

@NgModule({
  declarations: [FcTextareaComponent],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  exports: [FcTextareaComponent],
})
export class FcTextareaModule {}
