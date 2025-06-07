import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchSelectDialogComponent } from '@features/branch/components/branch-select-dialog/branch-select-dialog.component';
import { Classroom } from '@features/classroom/interfaces/classroom';
import { ClassroomService } from '@features/classroom/services/classroom.service';
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
  selector: 'app-classroom-view',
  templateUrl: './classroom-view.component.html',
  styleUrls: ['./classroom-view.component.css'],
})
export class ClassroomViewComponent {
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

  @Input() classroom: Classroom = {} as Classroom;
  loading = true;

  classroomForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcFilterDialogService: FcFilterDialogService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private classroomService: ClassroomService
  ) {
    this.classroom.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Classroom View',
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
    this.loadData();
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.loading = true;
    this.classroomService
      .getClassroom(this.classroom.id)
      .subscribe((res: any) => {
        this.classroom = res.data;
        this.classroomForm.patchValue({
          room: this.classroom.room,
          location: this.classroom.location,
          branch: this.classroom.branch,
        });
      });
  }

  submit() {
    this.actionButtons[0].loading = true;
    const updatedData = this.classroomForm.value;
    const bodyReq = {
      room: updatedData.room,
      location: updatedData.location,
      branch_id: updatedData.branch.id,
    };
    this.classroomService
      .updateClassroom(this.classroom.id, bodyReq)
      .subscribe({
        next: () => {
          this.actionButtons[0].loading = false;
          this.fcToastService.add({
            severity: 'success',
            header: 'Success',
            message: 'Student updated successfully',
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
      message: 'Are you sure that you want to delete this classroom?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.actionButtons[1].loading = true;
        this.classroomService.deleteClassroom(this.classroom.id).subscribe({
          next: (res: any) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'success',
              header: 'Success',
              message: 'Classroom deleted',
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
