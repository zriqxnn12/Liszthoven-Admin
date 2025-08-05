import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassroomSelectDialogComponent } from '@features/classroom/components/classroom-select-dialog/classroom-select-dialog.component';
import { CourseScheduleService } from '@features/course-schedule/services/course-schedule.service';
import { SelectCourseDialogComponent } from '@features/course/components/select-course-dialog/select-course-dialog.component';
import { TeacherSelectDialogComponent } from '@features/teacher/components/teacher-select-dialog/teacher-select-dialog.component';
import {
  faChevronDown,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-schedule-add',
  templateUrl: './course-schedule-add.component.html',
  styleUrls: ['./course-schedule-add.component.css'],
})
export class CourseScheduleAddComponent {
  private readonly destroy$ = new Subject<void>();
  faTimes = faTimes;
  faChevronDown = faChevronDown;

  actionButtons: any[] = [
    {
      label: 'Save',
      icon: faSave,
      action: () => {
        this.submit();
      },
    },
  ];

  courseScheduleForm!: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private dialogService: DialogService,
    private courseScheduleService: CourseScheduleService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Add Course Schedule',
      icon: '',
      showHeader: true,
    });
    this.courseScheduleForm = new FormGroup({
      course: new FormControl(null, Validators.required),
      teacher: new FormControl(null, Validators.required),
      classroom: new FormControl(null, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      duration: new FormControl(0, Validators.required),
      start_time: new FormControl(0, Validators.required),
      end_time: new FormControl(0, Validators.required),
    });
  }

  ngOnInit(): void {
    this.layoutService.setSearchConfig({ hide: true });
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    this.actionButtons[0].loading = true;
    let courseSchedule = this.courseScheduleForm.value;
    const formattedDate = moment(courseSchedule.date).format('YYYY-MM-DD');

    courseSchedule.start_time = moment()
      .startOf('day')
      .add(moment().utcOffset(), 'minutes')
      .add(courseSchedule.start_time, 'minutes')
      .format('HH:mm');

    courseSchedule.end_time = moment()
      .startOf('day')
      .add(moment().utcOffset(), 'minutes')
      .add(courseSchedule.end_time, 'minutes')
      .format('HH:mm');

    let payload = {
      course_id: courseSchedule.course.id,
      teacher_id: courseSchedule.teacher.id,
      classroom_id: courseSchedule.classroom.id,
      date: formattedDate,
      duration: courseSchedule.duration,
      start_time: courseSchedule.start_time,
      end_time: courseSchedule.end_time,
    };

    this.courseScheduleService.addCourseSchedule(payload).subscribe({
      next: () => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Course schedule added successfully',
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
  }

  onSelectCourse() {
    const ref = this.dialogService.open(SelectCourseDialogComponent, {
      data: {
        title: 'Select Course',
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '450px',
    });
    ref.onClose.subscribe((course) => {
      if (course) {
        this.courseScheduleForm.patchValue({
          course: course,
        });
      }
    });
  }

  removeCourse() {
    this.courseScheduleForm.patchValue({
      course: null,
    });
  }

  onSelectTeacher() {
    const ref = this.dialogService.open(TeacherSelectDialogComponent, {
      data: {
        title: 'Select Teacher',
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '450px',
    });
    ref.onClose.subscribe((teacher) => {
      if (teacher) {
        this.courseScheduleForm.patchValue({
          teacher: teacher,
        });
      }
    });
  }

  removeTeacher() {
    this.courseScheduleForm.patchValue({
      teacher: null,
    });
  }

  onSelectClassroom() {
    const ref = this.dialogService.open(ClassroomSelectDialogComponent, {
      data: {
        title: 'Select Classroom',
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '450px',
    });
    ref.onClose.subscribe((classroom) => {
      if (classroom) {
        this.courseScheduleForm.patchValue({
          classroom: classroom,
        });
      }
    });
  }

  removeClassroom() {
    this.courseScheduleForm.patchValue({
      classroom: null,
    });
  }
}
