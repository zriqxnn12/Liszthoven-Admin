import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FcSelectOptionModule } from '@shared/components/fc-select-option/fc-select-option.module';
import { SharedModule } from '@shared/shared.module';
import { SettingFormComponent } from './pages/setting-form/setting-form.component';
import { SettingGeneralComponent } from './pages/setting-general/setting-general.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SettingAutoNumberComponent } from './pages/setting-auto-number/setting-auto-number.component';

@NgModule({
  declarations: [
    SettingComponent,
    SettingGeneralComponent,
    SettingFormComponent,
    SettingAutoNumberComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
    FcSelectOptionModule,
  ],
})
export class SettingModule {}
