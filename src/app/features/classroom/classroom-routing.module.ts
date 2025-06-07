import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './classroom.component';
import { ClassroomListComponent } from './pages/classroom-list/classroom-list.component';
import { ClassroomAddComponent } from './pages/classroom-add/classroom-add.component';
import { ClassroomViewComponent } from './pages/classroom-view/classroom-view.component';

const routes: Routes = [
  {
    path: '',
    component: ClassroomComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ClassroomListComponent,
      },
      {
        path: 'add',
        component: ClassroomAddComponent,
      },
      {
        path: 'view/:id',
        component: ClassroomViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}
