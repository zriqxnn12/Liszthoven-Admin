import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventAddComponent } from './pages/event-add/event-add.component';
import { EventViewComponent } from './pages/event-view/event-view.component';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: EventListComponent,
      },
      {
        path: 'add',
        component: EventAddComponent,
      },
      {
        path: 'view/:id',
        component: EventViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
