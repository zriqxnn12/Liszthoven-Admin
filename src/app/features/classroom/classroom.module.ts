import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomListComponent } from './pages/classroom-list/classroom-list.component';
import { ClassroomAddComponent } from './pages/classroom-add/classroom-add.component';
import { ClassroomViewComponent } from './pages/classroom-view/classroom-view.component';
import { ClassroomSelectDialogComponent } from './components/classroom-select-dialog/classroom-select-dialog.component';
import { ClassroomComponent } from './classroom.component';
import { SharedModule } from '@shared/shared.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';

@NgModule({
  declarations: [
    ClassroomComponent,
    ClassroomListComponent,
    ClassroomAddComponent,
    ClassroomViewComponent,
    ClassroomSelectDialogComponent,
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcTextareaModule,
  ],
  exports: [ClassroomSelectDialogComponent],
})
export class ClassroomModule {}
