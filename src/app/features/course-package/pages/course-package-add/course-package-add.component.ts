import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursePackageService } from '@features/course-package/services/course-package.service';
import { SelectInstrumentDialogComponent } from '@features/instrument/components/select-instrument-dialog/select-instrument-dialog.component';
import {
  faChevronDown,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-package-add',
  templateUrl: './course-package-add.component.html',
  styleUrls: ['./course-package-add.component.css'],
})
export class CoursePackageAddComponent {
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

  coursePackageForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService,
    private coursePackageService: CoursePackageService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Add Course Package',
      icon: '',
      showHeader: true,
    });
    this.coursePackageForm = new FormGroup({
      name: new FormControl('', Validators.required),
      registration_fee: new FormControl(0, Validators.required),
      duration: new FormControl(0, Validators.required),
      description: new FormControl(''),
      instrument: new FormControl(null, Validators.required),
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
    let formValue = this.coursePackageForm.value;
    let bodyreq = {
      name: formValue.name,
      registration_fee: formValue.registration_fee,
      duration: formValue.duration,
      description: formValue.description,
      instrument_id: formValue.instrument.id,
    };
    this.coursePackageService.addCoursePackage(bodyreq).subscribe({
      next: (res: any) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Course Package added successfully',
        });
        this.router.navigate(['/course-package/list']);
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

  onSelectInstrument() {
    const ref = this.dialogService.open(SelectInstrumentDialogComponent, {
      data: {
        title: 'Select Instrument',
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
    ref.onClose.subscribe((instrument) => {
      if (instrument) {
        this.coursePackageForm.patchValue({
          instrument: instrument,
        });
      }
    });
  }

  removeInstrument() {
    this.coursePackageForm.patchValue({
      instrument: null,
    });
  }
}
