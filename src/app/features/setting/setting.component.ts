import { Component } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent {
  faChevronUp = faChevronUp;
  mainMenus: any[] = [
    {
      route: 'general',
      name: 'General',
    },
    {
      route: 'form',
      name: 'Form Setting',
    },
    // {
    //   route: 'auto-number',
    //   name: 'Auto Number',
    // },
  ];
  userConfig: any = {
    showSidebar: true,
    dateInputOptions: {},
    timeInputOptions: {},
    calculatorOptions: {},
    appScale: '1',
  };
  constructor(private layoutService: LayoutService) {
    this.layoutService.setHeaderConfig({
      title: 'Setting',
      icon: '',
      showHeader: true,
    });
  }
}
