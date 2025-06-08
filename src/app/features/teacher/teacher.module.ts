import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';
import { TeacherAddComponent } from './pages/teacher-add/teacher-add.component';
import { TeacherViewComponent } from './pages/teacher-view/teacher-view.component';
import { SharedModule } from '@shared/shared.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcInputNumberModule } from '@shared/components/fc-input-number/fc-input-number.module';
import { FcDatepickerModule } from '@shared/components/fc-datepicker/fc-datepicker.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { FcFilterDialogModule } from '@shared/components/fc-filter-dialog/fc-filter-dialog.module';
import { TeacherComponent } from './teacher.component';
import { FcInputTelModule } from '@shared/components/fc-input-tel/fc-input-tel.module';
import { TeacherSelectDialogComponent } from './components/teacher-select-dialog/teacher-select-dialog.component';

@NgModule({
  declarations: [
    TeacherComponent,
    TeacherListComponent,
    TeacherAddComponent,
    TeacherViewComponent,
    TeacherSelectDialogComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcInputNumberModule,
    FcDatepickerModule,
    FcFileInputModule,
    FcTextareaModule,
    FcFilterDialogModule,
    FcInputTelModule,
  ],
  exports: [],
})
export class TeacherModule {}
