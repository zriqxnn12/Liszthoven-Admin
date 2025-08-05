import { Component } from '@angular/core';
import { Course } from '@features/course/interfaces/course';
import { CourseService } from '@features/course/services/course.service';
import {
  faLocationDot,
  faPlus,
  faRefresh,
  faSearch,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-course-dialog',
  templateUrl: './select-course-dialog.component.html',
  styleUrls: ['./select-course-dialog.component.css'],
})
export class SelectCourseDialogComponent {
  private readonly destroy$: any = new Subject();
  faTimes = faTimes;
  faRefresh = faRefresh;
  faUser = faUser;
  faLocationDot = faLocationDot;
  faPlus = faPlus;
  faSearch = faSearch;

  courses: Course[] = [];
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
    private courseService: CourseService
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

  loadData(page: number = 0, searchQuery: string = this.searchQuery) {
    this.loading = true;
    let dataListParameter: DataListParameter = {} as DataListParameter;
    dataListParameter.rows = this.rows;
    dataListParameter.page = this.page;
    dataListParameter.sortBy = 'order_by=id&direction=desc&with_filter=1';
    dataListParameter.searchQuery = searchQuery;
    this.courseService
      .getCourses(dataListParameter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.loading = false;
        this.totalRecords = res.data.count;
        this.totalPages =
          this.totalRecords > this.rows
            ? Math.ceil(this.totalRecords / this.rows)
            : 1;
        this.courses = res.data.courses;
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

  submit(course: Course) {
    this.ref.close(course);
  }
  onClose() {
    this.ref.close();
  }
}
