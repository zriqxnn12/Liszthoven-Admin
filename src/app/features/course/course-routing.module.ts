import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseAddComponent } from './pages/course-add/course-add.component';

const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: CourseListComponent,
      },
      {
        path: 'add',
        component: CourseAddComponent,
      },
      {
        path: 'view/:id',
        component: CourseListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
