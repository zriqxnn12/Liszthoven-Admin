import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseScheduleRoutingModule } from './course-schedule-routing.module';
import { CourseScheduleComponent } from './course-schedule.component';
import { CourseScheduleListComponent } from './pages/course-schedule-list/course-schedule-list.component';
import { CourseScheduleAddComponent } from './pages/course-schedule-add/course-schedule-add.component';
import { CourseScheduleViewComponent } from './pages/course-schedule-view/course-schedule-view.component';
import { SharedModule } from '@shared/shared.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcDatepickerModule } from '@shared/components/fc-datepicker/fc-datepicker.module';
import { FcTimepickerModule } from '@shared/components/fc-timepicker/fc-timepicker.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputNumberModule } from '@shared/components/fc-input-number/fc-input-number.module';

@NgModule({
  declarations: [
    CourseScheduleComponent,
    CourseScheduleListComponent,
    CourseScheduleAddComponent,
    CourseScheduleViewComponent,
  ],
  imports: [
    CommonModule,
    CourseScheduleRoutingModule,
    SharedModule,
    FcInputTextModule,
    FcDatepickerModule,
    FcTimepickerModule,
    FcPaginationModule,
    FcInputNumberModule,
  ],
})
export class CourseScheduleModule {}
