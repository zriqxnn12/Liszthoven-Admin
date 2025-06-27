import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePackage } from '@features/course-package/interfaces/course-package';
import { CoursePackageService } from '@features/course-package/services/course-package.service';
import {
  faBook,
  faBuilding,
  faEye,
  faLocationDot,
  faPlus,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-package-list',
  templateUrl: './course-package-list.component.html',
  styleUrls: ['./course-package-list.component.css'],
})
export class CoursePackageListComponent {
  private readonly destroy$ = new Subject<void>();
  faEye = faEye;
  faLocationDot = faLocationDot;
  faBuilding = faBuilding;
  faBook = faBook;

  actionButtons: any[] = [
    {
      label: 'Add',
      icon: faPlus,
      route: ['/course-package/add'],
      action: () => {
        // this.navigateToAdd();
      },
    },
  ];
  filterButtons: any[] = [
    {
      label: 'Refresh',
      icon: faRefresh,
      action: () => {
        // this.loadData();
      },
    },
  ];

  coursePackages: CoursePackage[] = [];
  loading: boolean = false;
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService,
    private coursePackageService: CoursePackageService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Course Packages',
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

  loadData(page: number = 0) {
    this.loading = true;
    let dataListParameter: DataListParameter = {} as DataListParameter;
    dataListParameter.rows = this.rows;
    dataListParameter.page = this.page;
    dataListParameter.sortBy = 'order_by=id&direction=desc&with_filter=1';

    this.coursePackageService
      .getCoursePackages(dataListParameter)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.coursePackages = res.data.course_packages;
          this.totalRecords = res.data.count;
          this.totalPages =
            this.totalRecords > this.rows
              ? Math.ceil(this.totalRecords / this.rows)
              : 1;
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  navigateToDetail(coursePackage: CoursePackage) {
    this.router.navigate(['/course-package/view/', coursePackage.id]);
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
}
