import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent {
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Course Registration list',
      icon: '',
      showHeader: true,
    });
  }
}
