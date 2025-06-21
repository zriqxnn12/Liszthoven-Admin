import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceInvoiceComponent } from './service-invoice.component';
import { ServiceInvoiceListComponent } from './pages/service-invoice-list/service-invoice-list.component';
import { ServiceInvoiceAddComponent } from './pages/service-invoice-add/service-invoice-add.component';
import { ServiceInvoiceViewComponent } from './pages/service-invoice-view/service-invoice-view.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceInvoiceComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ServiceInvoiceListComponent,
      },
      {
        path: 'add',
        component: ServiceInvoiceAddComponent,
      },
      {
        path: 'view/:id',
        component: ServiceInvoiceViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceInvoiceRoutingModule {}
