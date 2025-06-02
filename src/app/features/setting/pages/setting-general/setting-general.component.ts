import { Component } from '@angular/core';
import { SettingService } from '@features/setting/services/setting.service';

@Component({
  selector: 'app-setting-general',
  templateUrl: './setting-general.component.html',
  styleUrls: ['./setting-general.component.css'],
})
export class SettingGeneralComponent {
  generalConfig: any = {
    showSidebar: true,
    hideWhenRouteChange: false,
  };
  constructor(private settingService: SettingService) {
    this.settingService.settingConfig$.subscribe((config) => {
      this.generalConfig = {
        ...this.generalConfig,
        ...config.generalConfig,
      };
    });
  }
  onUpdateGeneralConfig() {
    this.settingService.updateSettingConfig({
      generalConfig: this.generalConfig,
    });
  }
}
