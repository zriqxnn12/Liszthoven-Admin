import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchSelectDialogComponent } from '@features/branch/components/branch-select-dialog/branch-select-dialog.component';
import { ClassroomSelectDialogComponent } from '@features/classroom/components/classroom-select-dialog/classroom-select-dialog.component';
import { TeacherService } from '@features/teacher/services/teacher.service';
import {
  faChevronDown,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css'],
})
export class TeacherAddComponent {
  private readonly destroy$ = new Subject<void>();
  faChevronDown = faChevronDown;
  faTimes = faTimes;

  actionButtons: any[] = [
    {
      label: 'Save',
      icon: faSave,
      action: () => {
        this.submit();
      },
    },
  ];

  status = [
    {
      value: 0,
      label: 'Active',
    },
    {
      value: 1,
      label: 'Resign',
    },
  ];

  teacherType = [
    {
      value: 0,
      label: 'Permanent',
    },
    {
      value: 1,
      label: 'Part Time',
    },
  ];

  role = [
    {
      value: 0,
      label: 'Developer',
    },
    {
      value: 1,
      label: 'Teacher',
    },
    {
      value: 2,
      label: 'Admin',
    },
  ];
  registerForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private dialogService: DialogService,
    private teacherService: TeacherService,
    private fcToastService: FcToastService,
    private router: Router
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Teacher Add',
      icon: '',
      showHeader: true,
    });
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('asdqwe123'),
      phone_no: new FormControl(''),
      address: new FormControl(''),
      birth_place: new FormControl(''),
      birth_date: new FormControl(null),
      staff: new FormGroup({
        role: new FormControl(0, Validators.required),
        status: new FormControl(0, Validators.required),
        note: new FormControl('-'),
        teacher: new FormGroup({
          type: new FormControl(0, Validators.required),
          description: new FormControl('-'),
          qualify: new FormControl('-'),
          branch: new FormControl(null),
          classroom: new FormControl(null),
        }),
      }),
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

  get staffForm(): FormGroup {
    return this.registerForm.get('staff') as FormGroup;
  }

  get teacherForm(): FormGroup {
    return this.staffForm.get('teacher') as FormGroup;
  }

  submit() {
    let formValue = { ...this.registerForm.value };
    this.actionButtons[0].loading = true;
    const payload = {
      name: formValue.name,
      email: formValue.email,
      username: formValue.username,
      password: formValue.password,
      phone_no: formValue.phone_no,
      address: formValue.address,
      birth_place: formValue.birth_place,
      birth_date: formValue.birth_date
        ? new Date(formValue.birth_date).toISOString()
        : null,
      staff: {
        role: formValue.staff.role,
        status: formValue.staff.status,
        note: formValue.staff.note,
        teacher: {
          type: formValue.staff.teacher.type,
          qualify: formValue.staff.teacher.qualify,
          description: formValue.staff.teacher.description,
          branch_id: formValue.staff.teacher.branch?.id ?? null,
          classroom_id: formValue.staff.teacher.classroom?.id ?? null,
        },
      },
    };

    this.teacherService.addTeacher(payload).subscribe({
      next: () => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Teacher added successfully',
        });
        this.router.navigate(['/teacher/list']);
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
        this.teacherForm.patchValue({
          classroom: classroom,
        });
      }
    });
  }

  removeClassroom() {
    this.teacherForm.patchValue({
      classroom: null,
    });
  }

  onSelectBranch() {
    const ref = this.dialogService.open(BranchSelectDialogComponent, {
      data: {
        title: 'Select Branch',
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
    ref.onClose.subscribe((branch) => {
      if (branch) {
        this.teacherForm.patchValue({
          branch: branch,
        });
      }
    });
  }

  removeBranch() {
    this.teacherForm.patchValue({
      branch: null,
    });
  }
}
