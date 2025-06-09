import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentComponent } from './instrument.component';
import { InstrumentListComponent } from './pages/instrument-list/instrument-list.component';
import { InstrumentAddComponent } from './pages/instrument-add/instrument-add.component';
import { InstrumentViewComponent } from './pages/instrument-view/instrument-view.component';

const routes: Routes = [
  {
    path: '',
    component: InstrumentComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: InstrumentListComponent,
      },
      {
        path: 'add',
        component: InstrumentAddComponent,
      },
      {
        path: 'view/:id',
        component: InstrumentViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentRoutingModule {}
