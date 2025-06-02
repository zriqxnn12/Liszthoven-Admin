import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SettingService } from '@features/setting/services/setting.service';
import { faClock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'fc-timepicker',
  templateUrl: './fc-timepicker.component.html',
  styleUrls: ['./fc-timepicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FcTimepickerComponent),
      multi: true,
    },
  ],
})
export class FcTimepickerComponent {
  private readonly destroy$ = new Subject<void>();

  faTimes = faTimes;
  faClock = faClock;

  @Input() title = 'Time';

  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() filter = [];
  @Input() isHasDaytime = true;

  presetHour: number[] = [];
  presetMinute: number[] = [];
  presetSecond: number[] = [];
  presetDayTime: any[] = [
    {
      id: 1,
      name: 'AM',
    },
    {
      id: 2,
      name: 'PM',
    },
  ];

  value: any = null;

  onChange: any = () => {};

  onTouch: any = () => {};

  selectedHour: number | null = null;
  selectedMinute: number | null = null;
  selectedDayTime: string | null = null;

  constructor(private settingService: SettingService) {
    this.settingService.settingConfig$
      .pipe(takeUntil(this.destroy$))
      .subscribe((config) => {
        this.isHasDaytime =
          config.generalConfig.timeFormat == '12' ? true : false;
      });
  }

  ngOnInit(): void {
    if (this.isHasDaytime) {
      for (let i = 0; i < 12; i++) {
        this.presetHour.push(i);
      }
    } else {
      for (let i = 0; i < 24; i++) {
        this.presetHour.push(i);
      }
    }
    for (let i = 0; i < 60; i++) {
      this.presetMinute.push(i);
      this.presetSecond.push(i);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: any) {
    this.value = value * 60000;
    if (this.value) {
      if (this.isHasDaytime) {
        const hour = new Date(this.value).getHours();
        const minute = new Date(this.value).getMinutes();
        const daytime = hour > 12 ? 'PM' : 'AM';
        this.selectedHour = hour;
        this.selectedMinute = minute;
        this.selectedDayTime = daytime;
      } else {
        const hour = new Date(this.value).getHours();
        const minute = new Date(this.value).getMinutes();
        this.selectedHour = hour;
        this.selectedMinute = minute;
      }
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  onRemoveValue() {
    this.value = null;
    this.onValueChange(this.value);
  }
  onValueChange(val: any) {
    if (val !== undefined) {
      this.value = (val + new Date().getTimezoneOffset()) * 60000;
      this.onChange(val + new Date().getTimezoneOffset());
      this.onTouch(val + new Date().getTimezoneOffset());
    }
  }

  @ViewChild('hourContainer') hourContainer: ElementRef | undefined;
  @ViewChild('minuteContainer') minuteContainer: ElementRef | undefined;
  @ViewChild('daytimeContainer') daytimeContainer: ElementRef | undefined;
  scrollToHour() {
    setTimeout(() => {
      const value = this.value;
      if (value) {
        if (this.isHasDaytime) {
          const hour = new Date(value).getHours();
          const minute = new Date(value).getMinutes();
          const daytime = hour > 12 ? 'PM' : 'AM';

          if (this.hourContainer) {
            const hourElement = this.hourContainer.nativeElement.querySelector(
              `[id="${daytime == 'PM' ? hour - 12 : hour}"]`
            );
            if (hourElement) {
              hourElement.scrollIntoView();
            }
          }
          if (this.minuteContainer) {
            const minuteElement =
              this.minuteContainer.nativeElement.querySelector(
                `[id="${minute}"]`
              );
            if (minuteElement) {
              minuteElement.scrollIntoView();
            }
          }
          if (this.daytimeContainer) {
            const daytimeElement =
              this.daytimeContainer.nativeElement.querySelector(
                `[id="${daytime}"]`
              );
            if (daytimeElement) {
              daytimeElement.scrollIntoView();
            }
          }
        } else {
          const hour = new Date(value).getHours();
          const minute = new Date(value).getMinutes();
          if (this.hourContainer) {
            const hourElement = this.hourContainer.nativeElement.querySelector(
              `[id="${hour}"]`
            );
            if (hourElement) {
              hourElement.scrollIntoView();
            }
          }
          if (this.minuteContainer) {
            const minuteElement =
              this.minuteContainer.nativeElement.querySelector(
                `[id="${minute}"]`
              );
            if (minuteElement) {
              minuteElement.scrollIntoView();
            }
          }
        }
      }
    }, 10);
  }
  submit() {
    if (this.isHasDaytime) {
      if (
        this.selectedHour != null &&
        this.selectedMinute != null &&
        this.selectedDayTime != null
      ) {
        let hour = this.selectedHour;
        let minute = this.selectedMinute;
        let daytime = this.selectedDayTime;
        if (daytime === 'PM') {
          hour += 12;
        }
        this.onValueChange(hour * 60 + minute);
      }
    } else {
      if (this.selectedHour != null && this.selectedMinute != null) {
        let hour = this.selectedHour;
        let minute = this.selectedMinute;
        this.onValueChange(hour * 60 + minute);
      }
    }
  }
}
