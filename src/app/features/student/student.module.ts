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

@NgModule({
  declarations: [
    StudentComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentViewComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcFilterDialogModule,
  ],
})
export class StudentModule {}
