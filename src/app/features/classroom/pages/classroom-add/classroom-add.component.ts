import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchSelectDialogComponent } from '@features/branch/components/branch-select-dialog/branch-select-dialog.component';
import { ClassroomService } from '@features/classroom/services/classroom.service';
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
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.component.html',
  styleUrls: ['./classroom-add.component.css'],
})
export class ClassroomAddComponent {
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

  classroomForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService,
    private classroomService: ClassroomService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Add Classroom',
      icon: '',
      showHeader: true,
    });
    this.classroomForm = new FormGroup({
      room: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      branch: new FormControl(null, Validators.required),
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
    const formValue = this.classroomForm.value;
    const bodyReq = {
      room: formValue.room,
      location: formValue.location,
      branch_id: formValue.branch.id,
    };

    this.classroomService.addClassroom(bodyReq).subscribe({
      next: (res: any) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Classroom added successfully',
        });
        this.router.navigate(['/classroom/list']);
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
        this.classroomForm.patchValue({
          branch: branch,
        });
      }
    });
  }

  removeBranch() {
    this.classroomForm.patchValue({
      branch: null,
    });
  }
}
