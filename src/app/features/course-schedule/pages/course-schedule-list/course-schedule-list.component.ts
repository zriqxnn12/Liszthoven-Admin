import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseSchedule } from '@features/course-schedule/interfaces/course-schedule';
import { CourseScheduleService } from '@features/course-schedule/services/course-schedule.service';
import {
  faEye,
  faMusic,
  faPlus,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-schedule-list',
  templateUrl: './course-schedule-list.component.html',
  styleUrls: ['./course-schedule-list.component.css'],
})
export class CourseScheduleListComponent {
  private readonly destroy$ = new Subject<void>();
  faEye = faEye;
  faMusic = faMusic;

  actionButtons: any[] = [
    {
      label: 'Add',
      icon: faPlus,
      route: ['/course-schedule/add'],
      action: () => {},
    },
  ];
  filterButtons: any[] = [
    {
      label: 'Refresh',
      icon: faRefresh,
      action: () => {
        this.loadData();
      },
    },
  ];

  courseSchedules: CourseSchedule[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private courseScheduleService: CourseScheduleService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Course Schedules',
      icon: '',
      showHeader: true,
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(page: number = 0, searchQuery: string = this.searchQuery) {
    this.loading = true;
    let dataListParameter: DataListParameter = {} as DataListParameter;
    dataListParameter.rows = this.rows;
    dataListParameter.page = this.page;
    dataListParameter.sortBy = 'order_by=id&direction=desc&with_filter=1';
    dataListParameter.searchQuery = searchQuery;

    this.courseScheduleService
      .getCourseSchedules(dataListParameter)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.totalRecords = res.data.count;
          this.totalPages =
            this.totalRecords > this.rows
              ? Math.ceil(this.totalRecords / this.rows)
              : 1;
          this.loading = false;
          this.courseSchedules = res.data.course_schedules;
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  getStatusColor(status: number): string {
    switch (status) {
      case 0: //Scheduled
        return 'border-gray-600 bg-gray-100 text-gray-500 dark:border-gray-700 dark:bg-gray-700/20';
      case 1: // On progress
        return 'border-blue-600 bg-blue-100 text-blue-500 dark:border-blue-700 dark:bg-blue-700/20';
      case 2: // rescheduled
        return 'border-orange-600 bg-orange-100 text-orange-500 dark:border-orange-700 dark:bg-orange-700/20';
      case 3: // completed
        return 'border-green-600 bg-green-100 text-green-500 dark:border-green-700 dark:bg-green-700/20';
      case 4: // absent
        return 'border-red-600 bg-red-100 text-red-500 dark:border-red-700 dark:bg-red-700/20';
      default:
        return '';
    }
  }

  onPageUpdate(pagination: any) {
    let page = pagination.page;
    let rows = pagination.rows;
    this.rows = rows;
    if (page > 0) {
      this.page = page;
    } else {
      this.page = 1;
    }
    this.loadData(this.page);
  }

  navigateToDetail(courseSchedule: CourseSchedule) {
    this.router.navigate(['/course-schedule/view/', courseSchedule.id]);
  }
}
