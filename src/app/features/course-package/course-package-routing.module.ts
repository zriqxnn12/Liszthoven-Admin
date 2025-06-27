import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePackageComponent } from './course-package.component';
import { CoursePackageListComponent } from './pages/course-package-list/course-package-list.component';
import { CoursePackageAddComponent } from './pages/course-package-add/course-package-add.component';
import { CoursePackageViewComponent } from './pages/course-package-view/course-package-view.component';

const routes: Routes = [
  {
    path: '',
    component: CoursePackageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: CoursePackageListComponent,
      },
      {
        path: 'add',
        component: CoursePackageAddComponent,
      },
      {
        path: 'view/:id',
        component: CoursePackageViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursePackageRoutingModule {}
