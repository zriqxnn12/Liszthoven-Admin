import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { FeedbackListComponent } from './pages/feedback-list/feedback-list.component';
import { FeedbackViewComponent } from './pages/feedback-view/feedback-view.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: FeedbackListComponent,
      },
      {
        path: 'view/:id',
        component: FeedbackViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackRoutingModule {}
