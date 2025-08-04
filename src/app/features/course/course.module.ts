import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseAddComponent } from './pages/course-add/course-add.component';
import { CourseViewComponent } from './pages/course-view/course-view.component';
import { SharedModule } from '@shared/shared.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { SelectCourseDialogComponent } from './components/select-course-dialog/select-course-dialog.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseViewComponent,
    SelectCourseDialogComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
  ],
})
export class CourseModule {}
