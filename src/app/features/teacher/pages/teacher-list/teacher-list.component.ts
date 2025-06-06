import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from '@features/teacher/interfaces/teacher';
import { TeacherService } from '@features/teacher/services/teacher.service';
import {
  faBars,
  faEye,
  faFilter,
  faPlus,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent {
  private readonly destroy$ = new Subject<void>();
  faEye = faEye;

  actionButtons: any[] = [
    {
      label: 'Add',
      icon: faPlus,
      route: ['/teacher/add'],
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
    {
      label: 'Filter',
      icon: faFilter,
      action: () => {},
    },
    {
      label: 'Quick View',
      icon: faBars,
      action: () => {},
    },
  ];
  teachers: Teacher[] = [];
  loading: boolean = false;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService,
    private teacherService: TeacherService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Teachers',
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

  loadData() {
    this.loading = true;
    this.teacherService
      .getTeachers()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.teachers = res.data.teachers;
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  navigateToDetail(teacher: Teacher) {
    this.router.navigate(['/teacher/view/', teacher.id]);
  }
}
