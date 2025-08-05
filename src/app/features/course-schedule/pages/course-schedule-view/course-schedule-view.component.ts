import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseSchedule } from '@features/course-schedule/interfaces/course-schedule';
import { CourseScheduleService } from '@features/course-schedule/services/course-schedule.service';
import {
  faCalendar,
  faChevronDown,
  faClock,
  faLocationDot,
  faMoneyBill,
  faMusic,
  faSave,
  faTimes,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-schedule-view',
  templateUrl: './course-schedule-view.component.html',
  styleUrls: ['./course-schedule-view.component.css'],
})
export class CourseScheduleViewComponent {
  private readonly destroy$ = new Subject<void>();
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faUser = faUser;
  faCalendar = faCalendar;
  faClock = faClock;
  faMusic = faMusic;
  faLocationDot = faLocationDot;
  faMoneyBill = faMoneyBill;

  actionButtons: any[] = [
    {
      label: 'Delete',
      icon: faTrash,
      action: () => {
        this.delete();
      },
    },
  ];

  @Input() courseSchedule: CourseSchedule = {} as CourseSchedule;
  loading = true;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private courseScheduleService: CourseScheduleService
  ) {
    this.courseSchedule.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Course schedule View',
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
    this.courseScheduleService
      .getCourseSchedule(this.courseSchedule.id)
      .subscribe((res: any) => {
        this.courseSchedule = res.data;
      });
  }

  delete() {
    this.fcConfirmService.open({
      message: 'Are you sure that you want to delete this schedule?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.actionButtons[0].loading = true;
        this.courseScheduleService
          .deleteCourseSchedule(this.courseSchedule.id)
          .subscribe({
            next: () => {
              this.actionButtons[0].loading = false;
              this.fcToastService.clear();
              this.fcToastService.add({
                severity: 'success',
                header: 'Success',
                message: 'Course schedule deleted',
              });
              this.router.navigate(['/course-schedule/list']);
            },
            error: (err) => {
              this.actionButtons[0].loading = false;
              this.fcToastService.clear();
              this.fcToastService.add({
                severity: 'error',
                header: 'Error',
                message: err.message,
              });
            },
          });
      },
    });
  }
}
