import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentAddComponent } from './pages/student-add/student-add.component';
import { StudentViewComponent } from './pages/student-view/student-view.component';
import { SharedModule } from '@shared/shared.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcFilterDialogModule } from '@shared/components/fc-filter-dialog/fc-filter-dialog.module';
import { FcInputNumberModule } from '@shared/components/fc-input-number/fc-input-number.module';
import { FcDatepickerModule } from '@shared/components/fc-datepicker/fc-datepicker.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { SelectStudentDialogComponent } from './components/select-student-dialog/select-student-dialog.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentViewComponent,
    SelectStudentDialogComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcInputNumberModule,
    FcDatepickerModule,
    FcFileInputModule,
    FcTextareaModule,
    FcFilterDialogModule,
  ],
})
export class StudentModule {}
