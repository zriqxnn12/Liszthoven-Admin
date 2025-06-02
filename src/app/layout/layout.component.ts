import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SettingService } from '@features/setting/services/setting.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  sidebarConfig: any = {
    showSidebar: true,
    hideWhenRouteChange: false,
    overlay: true,
  };

  constructor(
    private settingService: SettingService,
    private router: Router
  ) {
    this.settingService.settingConfig$.subscribe((config) => {
      // match with for each
      for (const key in config.generalConfig) {
        if (Object.prototype.hasOwnProperty.call(config.generalConfig, key)) {
          const element = config.generalConfig[key];
          this.sidebarConfig[key] = element;
        }
      }
    });
    // check if sidebar is hidden when route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.sidebarConfig.hideWhenRouteChange) {
          this.sidebarConfig.showSidebar = false;
        }
      }
    });
  }

  ngOnInit(): void {}

  toggleSidebar(showBarStatus: boolean) {
    this.sidebarConfig.showSidebar = showBarStatus;
  }
}
