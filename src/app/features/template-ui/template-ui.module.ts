import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FcCalculatorModule } from '@shared/components/fc-calculator/fc-calculator.module';
import { FcDatepickerModule } from '@shared/components/fc-datepicker/fc-datepicker.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { FcImagePreviewModule } from '@shared/components/fc-image-preview/fc-image-preview.module';
import { FcInputBooleanModule } from '@shared/components/fc-input-boolean/fc-input-boolean.module';
import { FcInputNumberModule } from '@shared/components/fc-input-number/fc-input-number.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { SharedModule } from '@shared/shared.module';
import { TemplateUiRoutingModule } from './template-ui-routing.module';
import { TemplateUiComponent } from './template-ui.component';

@NgModule({
  declarations: [TemplateUiComponent],
  imports: [
    CommonModule,
    TemplateUiRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcDatepickerModule,
    FcCalculatorModule,
    FcFileInputModule,
    FcInputNumberModule,
    FcInputBooleanModule,
    FcInputTextModule,
    FcImagePreviewModule,
  ],
})
export class TemplateUiModule {}
