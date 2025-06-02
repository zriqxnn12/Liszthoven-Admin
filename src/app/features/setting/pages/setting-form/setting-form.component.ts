import { Component } from '@angular/core';
import { SettingService } from '@features/setting/services/setting.service';

@Component({
  selector: 'app-setting-form',
  templateUrl: './setting-form.component.html',
  styleUrls: ['./setting-form.component.css'],
})
export class SettingFormComponent {
  timeFormatOptions: any[] = [
    {
      label: '12 Hours',
      value: '12',
    },
    {
      label: '24 Hours',
      value: '24',
    },
  ];
  formConfig: any = {
    today: true,
    timeFormat: '24',
    hideAfterCalculate: false,
  };
  constructor(private settingService: SettingService) {
    this.settingService.settingConfig$.subscribe((config) => {
      this.formConfig = {
        ...this.formConfig,
        ...config.formConfig,
      };
    });
  }
  onChangeConfig() {
    this.settingService.updateSettingConfig({
      formConfig: this.formConfig,
    });
  }
}
