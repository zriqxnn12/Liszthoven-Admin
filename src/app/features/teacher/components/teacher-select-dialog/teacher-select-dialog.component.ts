import { Component } from '@angular/core';
import { Teacher } from '@features/teacher/interfaces/teacher';
import { TeacherService } from '@features/teacher/services/teacher.service';
import {
  faLocationDot,
  faPhone,
  faPlus,
  faRefresh,
  faSearch,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-teacher-select-dialog',
  templateUrl: './teacher-select-dialog.component.html',
  styleUrls: ['./teacher-select-dialog.component.css'],
})
export class TeacherSelectDialogComponent {
  private readonly destroy$: any = new Subject();
  faTimes = faTimes;
  faRefresh = faRefresh;
  faUser = faUser;
  faPhone = faPhone;
  faPlus = faPlus;
  faSearch = faSearch;

  teachers: Teacher[] = [];
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
    private fcFilterDialogService: FcFilterDialogService,
    private teacherService: TeacherService
  ) {
    if (this.config.data.title) {
      this.title = this.config.data.title;
    }
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
    dataListParameter.sortBy = 'order_by=id&direction=asc&with_filter=1';
    dataListParameter.searchQuery = searchQuery;
    this.teacherService
      .getTeachers(dataListParameter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.loading = false;
        this.totalRecords = res.data.count;
        this.totalPages =
          this.totalRecords > this.rows
            ? Math.ceil(this.totalRecords / this.rows)
            : 1;
        this.teachers = res.data.teachers;
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

  submit(teacher: Teacher) {
    this.ref.close(teacher);
  }
  onClose() {
    this.ref.close();
  }
}
