import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePackage } from '@features/course-package/interfaces/course-package';
import { CoursePackageService } from '@features/course-package/services/course-package.service';
import { SelectInstrumentDialogComponent } from '@features/instrument/components/select-instrument-dialog/select-instrument-dialog.component';
import {
  faChevronDown,
  faSave,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-package-view',
  templateUrl: './course-package-view.component.html',
  styleUrls: ['./course-package-view.component.css'],
})
export class CoursePackageViewComponent {
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
    {
      label: 'Delete',
      icon: faTrash,
      action: () => {
        this.delete();
      },
    },
  ];

  coursePackageForm: FormGroup;
  @Input() coursePackage: CoursePackage = {} as CoursePackage;
  loading = true;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcFilterDialogService: FcFilterDialogService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private coursePackageService: CoursePackageService
  ) {
    this.coursePackage.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Course Package View',
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
    this.loadData();
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.loading = true;
    this.coursePackageService
      .getCoursePackage(this.coursePackage.id)
      .subscribe((res: any) => {
        this.loading = false;
        this.coursePackage = res.data;
        this.coursePackageForm.patchValue({
          name: this.coursePackage.name,
          registration_fee: this.coursePackage.registration_fee,
          duration: this.coursePackage.duration,
          description: this.coursePackage.description,
          instrument: this.coursePackage.instrument,
        });
      });
  }

  submit() {
    this.actionButtons[0].loading = true;
    let updatedData = this.coursePackageForm.value;
    let payload = {
      name: updatedData.name,
      registration_fee: updatedData.registration_fee,
      duration: updatedData.duration,
      description: updatedData.description,
      instrument_id: updatedData.instrument.id,
    };
    this.coursePackageService
      .updateCoursePackage(this.coursePackage.id, payload)
      .subscribe({
        next: (res: any) => {
          this.actionButtons[0].loading = false;
          this.fcToastService.add({
            severity: 'success',
            header: 'Success',
            message: 'Course Package updated successfully',
          });
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

  delete() {
    this.fcConfirmService.open({
      message: 'Are you sure that you want to delete this course package?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.actionButtons[1].loading = true;
        this.coursePackageService
          .deleteCoursePackage(this.coursePackage.id)
          .subscribe({
            next: (res: any) => {
              this.actionButtons[1].loading = false;
              this.fcToastService.clear();
              this.fcToastService.add({
                severity: 'success',
                header: 'Success',
                message: 'Course package deleted',
              });
              this.router.navigate(['/course-package/list']);
            },
            error: (err) => {
              this.actionButtons[1].loading = false;
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
