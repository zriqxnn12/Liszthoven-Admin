import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventParticipantAddDialogComponent } from '@features/event/components/event-participant-add-dialog/event-participant-add-dialog.component';
import { Event, EventParticipant } from '@features/event/interfaces/event';
import { EventService } from '@features/event/services/event.service';
import {
  faChevronDown,
  faCloudArrowUp,
  faEnvelope,
  faLocationDot,
  faPencil,
  faPlus,
  faReceipt,
  faRefresh,
  faSave,
  faSpinner,
  faTimes,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css'],
})
export class EventViewComponent {
  private readonly destroy$: any = new Subject();
  // Icons
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faPlus = faPlus;
  faPencil = faPencil;
  faSpinner = faSpinner;
  faTrash = faTrash;
  faRefresh = faRefresh;
  faLocationDot = faLocationDot;
  faCloudArrowUp = faCloudArrowUp;
  faReceipt = faReceipt;
  faEnvelope = faEnvelope;
  faXmark = faXmark;

  actionButtons: any[] = [
    {
      label: 'Save',
      icon: faSave,
      action: () => {
        // this.submit();
      },
    },
    {
      label: 'Delete',
      icon: faTrash,
      action: () => {
        this.delete();
      },
    },
  ];

  eventParticipantsNavigationTabs = [
    {
      id: 99,
      label: 'All',
    },
    {
      id: 0,
      label: 'Request to Join',
    },
    {
      id: 1,
      label: 'Accepted',
    },
    {
      id: 2,
      label: 'Rejected',
    },
    {
      id: 3,
      label: 'Payment Review',
    },
    {
      id: 4,
      label: 'Completed',
    },
  ];
  selectedTab: any = this.eventParticipantsNavigationTabs[0];

  types = [
    { label: 'Student', value: 0 },
    { label: 'Teacher', value: 1 },
  ];

  imageUrl: string = '';
  paymentImgUrl: string = '';
  @Input() event: Event = {} as Event;
  loading = false;
  eventForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private router: Router,
    private eventService: EventService
  ) {
    this.event.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Event View',
      icon: '',
      showHeader: true,
    });
    this.eventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      type: new FormControl(0, Validators.required),
      quota: new FormControl(0, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      fee: new FormControl(0, Validators.required),
      start_time: new FormControl(0, Validators.required),
      end_time: new FormControl(0, Validators.required),
      address: new FormControl('', Validators.required),
      file_path: new FormControl(null, Validators.required),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.layoutService.setSearchConfig({ hide: true });
    this.loadData();
  }
  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refresh() {
    this.loadData();
  }

  addImage(image: any) {
    this.eventForm.controls['file_path'].setValue(image);
  }

  getImageFullUrl(filePath: string): string {
    if (!filePath) return '';
    // sesuaikan base url ini dengan URL API-mu atau public URL penyimpanan file
    return `https://practice1337.s3.ap-southeast-1.amazonaws.com/${filePath}`;
  }

  loadData() {
    this.loading = true;
    this.eventService.getEvent(this.event.id).subscribe((res: any) => {
      this.loading = false;
      this.event = res.data;
      let startTime =
        Number(this.event.start_time.split(':')[0]) * 60 +
        Number(this.event.start_time.split(':')[1]) -
        moment().utcOffset();
      let endTime =
        Number(this.event.end_time.split(':')[0]) * 60 +
        Number(this.event.end_time.split(':')[1]) -
        moment().utcOffset();

      this.imageUrl = this.getImageFullUrl(this.event.file_path);

      this.eventForm.patchValue({
        title: this.event.title,
        type: this.event.type,
        quota: this.event.quota,
        date: this.event.date,
        start_time: startTime,
        end_time: endTime,
        address: this.event.address,
        fee: this.event.fee,
        file_path: this.imageUrl,
        description: this.event.description,
      });
      this.loadEventParticipants(99);
    });
  }

  loadingEventParticipant = false;
  rows = 10;
  page = 1;
  totalRecords = 0;
  totalPages = 1;
  loadEventParticipants(status: number) {
    let dataListParameter: DataListParameter = {} as DataListParameter;
    dataListParameter.rows = this.rows;
    dataListParameter.page = this.page;
    dataListParameter.sortBy = 'order_by=id';
    dataListParameter.filterObj = 'direction=desc';
    if (status !== 99) {
      dataListParameter.filterObj += '&status=' + status + '&with_filter=1';
    }
    this.loadingEventParticipant = true;
    this.eventService
      .getEventParticipants(this.event.id, dataListParameter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.loadingEventParticipant = false;
        this.event.event_participants = res.data.event_participants;
        this.totalRecords = res.data.count;
        this.totalPages =
          this.totalRecords > this.rows
            ? Math.ceil(this.totalRecords / this.rows)
            : 1;
      });
  }

  assignUsertoEventParticipant() {
    const ref = this.dialogService.open(EventParticipantAddDialogComponent, {
      data: {
        title: `Assign ${this.event.type == 1 ? 'Teacher' : 'Student'}`,
        event: this.event,
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
      width: '600px',
    });
    ref.onClose.subscribe((eventParticipants) => {
      if (eventParticipants) {
        this.refresh();
        // this.event.event_participants.unshift(eventParticipant);
      }
    });
  }

  acceptParticipant(participant: EventParticipant) {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure to accept this participant?',
      accept: () => {
        this.eventService
          .updateParticipantToAccepted(this.event.id, participant.id)
          .subscribe({
            next: (res: any) => {
              this.fcToastService.add({
                severity: 'success',
                header: 'Participant Accepted',
                message: res.message,
              });
              this.refresh();
            },
            error: (err) => {
              this.fcToastService.add({
                severity: 'error',
                header: 'fail Accept',
                message: err.message,
              });
            },
          });
      },
    });
  }

  rejectParticipant(participant: EventParticipant) {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure to reject this participant?',
      accept: () => {
        this.eventService
          .updateParticipantToRejected(this.event.id, participant.id)
          .subscribe({
            next: (res: any) => {
              this.fcToastService.add({
                severity: 'success',
                header: 'Participant Rejected',
                message: res.message,
              });
              this.refresh();
            },
            error: (err) => {
              this.fcToastService.add({
                severity: 'error',
                header: 'fail to generate',
                message: err.message,
              });
            },
          });
      },
    });
  }

  generateToPaid(participant: EventParticipant) {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure to accept this participant?',
      accept: () => {
        this.eventService
          .updateParticipantToPaid(this.event.id, participant.id)
          .subscribe({
            next: (res: any) => {
              this.fcToastService.add({
                severity: 'success',
                header: 'Participant Paid',
                message: res.message,
              });
              this.refresh();
            },
            error: (err) => {
              this.fcToastService.add({
                severity: 'error',
                header: 'fail to generate',
                message: err.message,
              });
            },
          });
      },
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
    this.loadEventParticipants(this.selectedTab.id);
  }

  onSelectTab(tab: any) {
    this.selectedTab = tab;
    this.loadEventParticipants(tab.id);
  }

  statusColor(status: number) {
    switch (status) {
      case 0:
        return 'text-slate-400 dark:text-slate-500';
      case 1:
        return 'text-yellow-500 dark:text-yellow-600';
      case 2:
        return 'text-red-500 dark:text-red-600';
      case 3:
        return 'text-sky-500 dark:text-sky-600';
      case 4:
        return 'text-green-500 dark:text-green-600';
      default:
        return '';
    }
  }

  delete() {
    this.fcConfirmService.open({
      header: 'Confirmation',
      message: 'Are you sure to delete this event?',
      accept: () => {
        this.actionButtons[1].loading = true;
        this.eventService.deleteEvent(this.event.id).subscribe({
          next: (res: any) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.add({
              severity: 'success',
              header: 'Event deleted',
              message: res.message,
            });
            this.router.navigate(['/event/list']);
          },
          error: (err) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'error',
              header: 'error',
              message: err.message,
            });
          },
        });
      },
    });
  }
}
