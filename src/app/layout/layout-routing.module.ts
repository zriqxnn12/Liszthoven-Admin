import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'branch',
        pathMatch: 'full',
      },
      {
        path: 'template-ui',
        loadChildren: () =>
          import('../features/template-ui/template-ui.module').then(
            (m) => m.TemplateUiModule
          ),
      },
      {
        path: 'supplier',
        loadChildren: () =>
          import('../features/supplier/supplier.module').then(
            (m) => m.SupplierModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../features/calendar/calendar.module').then(
            (m) => m.CalendarModule
          ),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('../features/setting/setting.module').then(
            (m) => m.SettingModule
          ),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('../features/student/student.module').then(
            (m) => m.StudentModule
          ),
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('../features/teacher/teacher.module').then(
            (m) => m.TeacherModule
          ),
      },
      {
        path: 'branch',
        loadChildren: () =>
          import('../features/branch/branch.module').then(
            (m) => m.BranchModule
          ),
      },
      {
        path: 'classroom',
        loadChildren: () =>
          import('../features/classroom/classroom.module').then(
            (m) => m.ClassroomModule
          ),
      },
      {
        path: 'instrument',
        loadChildren: () =>
          import('../features/instrument/instrument.module').then(
            (m) => m.InstrumentModule
          ),
      },
      {
        path: 'service-invoice',
        loadChildren: () =>
          import('../features/service-invoice/service-invoice.module').then(
            (m) => m.ServiceInvoiceModule
          ),
      },
      {
        path: 'event',
        loadChildren: () =>
          import('../features/event/event.module').then((m) => m.EventModule),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('../features/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          ),
      },
      {
        path: 'course-package',
        loadChildren: () =>
          import('../features/course-package/course-package.module').then(
            (m) => m.CoursePackageModule
          ),
      },
      {
        path: 'course',
        loadChildren: () =>
          import('../features/course/course.module').then(
            (m) => m.CourseModule
          ),
      },
      {
        path: 'course-schedule',
        loadChildren: () =>
          import('../features/course-schedule/course-schedule.module').then(
            (m) => m.CourseScheduleModule
          ),
      },
      {
        path: 'music-genre',
        loadChildren: () =>
          import('../features/music-genre/music-genre.module').then(
            (m) => m.MusicGenreModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
