import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseScheduleComponent } from './course-schedule.component';
import { CourseScheduleListComponent } from './pages/course-schedule-list/course-schedule-list.component';
import { CourseScheduleAddComponent } from './pages/course-schedule-add/course-schedule-add.component';
import { CourseScheduleViewComponent } from './pages/course-schedule-view/course-schedule-view.component';

const routes: Routes = [
  {
    path: '',
    component: CourseScheduleComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: CourseScheduleListComponent,
      },
      {
        path: 'add',
        component: CourseScheduleAddComponent,
      },
      {
        path: 'view/:id',
        component: CourseScheduleViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseScheduleRoutingModule {}
