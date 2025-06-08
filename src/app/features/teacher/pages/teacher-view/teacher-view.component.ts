import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchSelectDialogComponent } from '@features/branch/components/branch-select-dialog/branch-select-dialog.component';
import { ClassroomSelectDialogComponent } from '@features/classroom/components/classroom-select-dialog/classroom-select-dialog.component';
import { Teacher } from '@features/teacher/interfaces/teacher';
import { TeacherService } from '@features/teacher/services/teacher.service';
import {
  faChevronDown,
  faCloudArrowUp,
  faSave,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css'],
})
export class TeacherViewComponent {
  private readonly destroy$ = new Subject<void>();
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faCloudArrowUp = faCloudArrowUp;

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

  @Input() teacher: Teacher = {} as Teacher;
  loading = true;
  teacherForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private teacherService: TeacherService
  ) {
    this.teacher.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Teacher View',
      icon: '',
      showHeader: true,
    });
    this.teacherForm = new FormGroup({
      type: new FormControl(0, Validators.required),
      description: new FormControl('-'),
      qualify: new FormControl('-'),
      branch: new FormControl(null),
      classroom: new FormControl(null),
      staff: new FormGroup({
        role: new FormControl(0, Validators.required),
        status: new FormControl(0, Validators.required),
        note: new FormControl('-'),
        user: new FormGroup({
          name: new FormControl('', Validators.required),
          phone_no: new FormControl(''),
          address: new FormControl(''),
          birth_place: new FormControl(''),
          birth_date: new FormControl(null),
        }),
      }),
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

  get staffForm(): FormGroup {
    return this.teacherForm.get('staff') as FormGroup;
  }

  get userForm(): FormGroup {
    return this.staffForm.get('user') as FormGroup;
  }

  loadData() {
    this.loading = true;
    this.teacherService.getTeacher(this.teacher.id).subscribe((res: any) => {
      this.teacher = res.data;
      this.teacherForm.patchValue({
        type: this.teacher.type,
        description: this.teacher.description,
        qualify: this.teacher.qualify,
        branch: this.teacher.branch,
        classroom: this.teacher.classroom,
      });
      this.staffForm.patchValue({
        role: this.teacher.staff.role,
        status: this.teacher.staff.status,
        note: this.teacher.staff.note,
      });
      this.userForm.patchValue({
        name: this.teacher.staff.user.name,
        phone_no: this.teacher.staff.user.phone_no,
        address: this.teacher.staff.user.address,
        birth_place: this.teacher.staff.user.birth_place,
        birth_date: this.teacher.staff.user.birth_date,
      });
      this.loading = false;
    });
  }

  submit() {
    this.actionButtons[0].loading = true;
    const updatedData = this.teacherForm.value;
    const payload = {
      type: updatedData.type,
      description: updatedData.description,
      qualify: updatedData.qualify,
      branch_id: updatedData.branch?.id ?? null,
      classroom_id: updatedData.classroom?.id ?? null,
      staff: {
        role: updatedData.staff.role,
        status: updatedData.staff.status,
        note: updatedData.staff.note,
        user: {
          name: updatedData.staff.user.name,
          phone_no: updatedData.staff.user.phone_no,
          address: updatedData.staff.user.address,
          birth_place: updatedData.staff.user.birth_place,
          birth_date: updatedData.staff.user.birth_date,
        },
      },
    };
    this.teacherService.updateTeacher(this.teacher.id, payload).subscribe({
      next: () => {
        this.actionButtons[0].loading = false;
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Teacher updated successfully',
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
      message: 'Are you sure that you want to delete this student?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.actionButtons[1].loading = true;
        this.teacherService.deleteTeacher(this.teacher.id).subscribe({
          next: (res: any) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'success',
              header: 'Success',
              message: res.message,
            });
            this.router.navigate(['/teacher/list']);
          },
          error: (err) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'error',
              header: 'Student',
              message: err.message,
            });
          },
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
