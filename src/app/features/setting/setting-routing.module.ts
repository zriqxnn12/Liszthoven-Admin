import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingAutoNumberComponent } from './pages/setting-auto-number/setting-auto-number.component';
import { SettingFormComponent } from './pages/setting-form/setting-form.component';
import { SettingGeneralComponent } from './pages/setting-general/setting-general.component';
import { SettingComponent } from './setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full',
      },
      {
        path: 'general',
        component: SettingGeneralComponent,
      },
      {
        path: 'form',
        component: SettingFormComponent,
      },
      {
        path: 'auto-number',
        component: SettingAutoNumberComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
