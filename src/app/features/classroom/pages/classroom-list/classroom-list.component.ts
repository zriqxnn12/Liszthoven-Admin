import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from '@features/classroom/interfaces/classroom';
import { ClassroomService } from '@features/classroom/services/classroom.service';
import {
  faBuilding,
  faEye,
  faLocationDot,
  faPlus,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css'],
})
export class ClassroomListComponent {
  private readonly destroy$ = new Subject<void>();
  faEye = faEye;
  faLocationDot = faLocationDot;
  faBuilding = faBuilding;

  actionButtons: any[] = [
    {
      label: 'Add',
      icon: faPlus,
      route: ['/classroom/add'],
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
        this.loadData();
      },
    },
    // {
    //   label: 'Filter',
    //   icon: faFilter,
    //   action: () => {},
    // },
    // {
    //   label: 'Quick View',
    //   icon: faBars,
    //   action: () => {},
    // },
  ];
  classrooms: Classroom[] = [];
  loading: boolean = false;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService,
    private classroomService: ClassroomService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Classrooms',
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
    this.classroomService
      .getClassrooms()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.classrooms = res.data.classrooms;
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  navigateToDetail(classroom: Classroom) {
    this.router.navigate(['/classroom/view/', classroom.id]);
  }
}
