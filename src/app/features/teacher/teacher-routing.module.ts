import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';
import { TeacherAddComponent } from './pages/teacher-add/teacher-add.component';
import { TeacherViewComponent } from './pages/teacher-view/teacher-view.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: TeacherListComponent,
      },
      {
        path: 'add',
        component: TeacherAddComponent,
      },
      {
        path: 'view/:id',
        component: TeacherViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
