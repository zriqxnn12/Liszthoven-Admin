import { Component } from '@angular/core';
import { CoursePackage } from '@features/course-package/interfaces/course-package';
import { CoursePackageService } from '@features/course-package/services/course-package.service';
import {
  faBook,
  faPlus,
  faRefresh,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-course-package-dialog',
  templateUrl: './select-course-package-dialog.component.html',
  styleUrls: ['./select-course-package-dialog.component.css'],
})
export class SelectCoursePackageDialogComponent {
  private readonly destroy$: any = new Subject();
  // Icons
  faTimes = faTimes;
  faRefresh = faRefresh;
  faPlus = faPlus;
  faSearch = faSearch;
  faBook = faBook;

  coursePackages: CoursePackage[] = [];
  searchQuery: string = '';
  loading = false;
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;
  title = '';
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private coursePackageService: CoursePackageService
  ) {
    if (this.config.data.title) {
      this.title = this.config.data.title;
    }
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
      .subscribe((res: any) => {
        this.loading = false;
        this.totalRecords = res.data.count;
        this.totalPages =
          this.totalRecords > this.rows
            ? Math.ceil(this.totalRecords / this.rows)
            : 1;
        this.coursePackages = res.data.course_packages;
      });
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

  search() {
    this.page = 1;
    this.loadData(this.page);
  }

  submit(coursePackage: CoursePackage) {
    this.ref.close(coursePackage);
  }
  onClose() {
    this.ref.close();
  }
}
