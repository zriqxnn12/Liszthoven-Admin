import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FcDirtyStateService } from '@core/service/fc-dirty-state.service';
import { EventService } from '@features/event/services/event.service';
import { SelectStudentDialogComponent } from '@features/student/components/select-student-dialog/select-student-dialog.component';
import { TeacherSelectDialogComponent } from '@features/teacher/components/teacher-select-dialog/teacher-select-dialog.component';
import {
  faChevronDown,
  faCloudArrowUp,
  faPlus,
  faSpinner,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-event-participant-add-dialog',
  templateUrl: './event-participant-add-dialog.component.html',
  styleUrls: ['./event-participant-add-dialog.component.css'],
})
export class EventParticipantAddDialogComponent {
  private readonly destroy$: any = new Subject();
  // Icons
  faTimes = faTimes;
  faSpinner = faSpinner;
  faChevronDown = faChevronDown;
  faCloudArrowUp = faCloudArrowUp;
  faPlus = faPlus;

  loading = false;
  title = '';
  event: any;

  paidStatuses = [
    { label: 'Paid', value: 1 },
    { label: 'Not Yet', value: 0 },
  ];

  eventParticipantForm: FormGroup;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fcToastService: FcToastService,
    private eventService: EventService,
    private fcdirtyStateService: FcDirtyStateService,
    private dialogService: DialogService
  ) {
    if (this.config.data) {
      if (this.config.data.title) {
        this.title = this.config.data.title;
      }
      if (this.config.data.event) {
        this.event = this.config.data.event;
      }
    }
    this.eventParticipantForm = new FormGroup({
      user: new FormControl([], Validators.required),
      is_paid: new FormControl(this.paidStatuses[0].value, Validators.required),
    });
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClose() {
    this.ref.close();
  }

  onSelectStudent() {
    const ref = this.dialogService.open(SelectStudentDialogComponent, {
      data: {
        title: 'Select Student',
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
    ref.onClose.subscribe((students) => {
      if (students && students.length > 0) {
        this.eventParticipantForm.controls['user'].setValue(students);
      }
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
    ref.onClose.subscribe((teachers) => {
      if (teachers && teachers.length > 0) {
        this.eventParticipantForm.controls['user'].setValue(teachers);
      }
    });
  }

  onRemoveUser() {
    this.eventParticipantForm.controls['user'].setValue(null);
  }

  setBodyReq() {}
}
