import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LottieModule } from 'ngx-lottie';
import { FcInputBooleanComponent } from './fc-input-boolean.component';

@NgModule({
  declarations: [FcInputBooleanComponent],
  imports: [CommonModule, FormsModule, FontAwesomeModule, LottieModule],
  exports: [FcInputBooleanComponent],
})
export class FcInputBooleanModule {}
