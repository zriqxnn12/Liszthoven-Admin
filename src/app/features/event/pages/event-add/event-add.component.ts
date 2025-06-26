import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '@features/event/services/event.service';
import {
  faChevronDown,
  faCloudArrowUp,
  faLocationDot,
  faPencil,
  faPlus,
  faRefresh,
  faSave,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css'],
})
export class EventAddComponent {
  private readonly destroy$: any = new Subject();
  // Icons
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;
  faRefresh = faRefresh;
  faLocationDot = faLocationDot;
  faCloudArrowUp = faCloudArrowUp;

  actionButtons: any[] = [
    {
      label: 'Save',
      icon: faSave,
      action: () => {
        this.submit();
      },
    },
  ];

  types = [
    { label: 'Student', value: 0 },
    { label: 'Teacher', value: 1 },
  ];

  loading = false;
  eventForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcFilterDialogService: FcFilterDialogService,
    private fcToastService: FcToastService,
    private dialogService: DialogService,
    private eventService: EventService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Event Add',
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
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addImage(image: any) {
    this.eventForm.controls['file_path'].setValue(image);
  }

  submit() {
    this.actionButtons[0].loading = true;
    let event = this.eventForm.value;
    let fd = new FormData();

    event.start_time = moment()
      .startOf('day')
      .add(moment().utcOffset(), 'minutes')
      .add(event.start_time, 'minutes')
      .format('HH:mm:ss');
    event.end_time = moment()
      .startOf('day')
      .add(moment().utcOffset(), 'minutes')
      .add(event.end_time, 'minutes')
      .format('HH:mm:ss');

    fd.append(`title`, event.title);
    fd.append(`address`, event.address);
    fd.append(`type`, event.type);
    fd.append(`date`, event.date);
    fd.append(`start_time`, event.start_time);
    fd.append(`end_time`, event.end_time);
    fd.append(`quota`, event.quota);
    fd.append(`fee`, event.fee);
    fd.append(`file_path`, event.file_path.file);
    fd.append(`description`, event.description);

    console.log(fd);

    this.eventService.addEvent(fd).subscribe({
      next: (res: any) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Event',
          message: res.message,
        });
        this.router.navigate(['/event/view/', res.data.id]);
      },
      error: (err) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'error',
          header: 'Event',
          message: err.message,
        });
      },
    });
  }
}
