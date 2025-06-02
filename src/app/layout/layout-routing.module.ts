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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
