import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from '@features/branch/interfaces/branch';
import { BranchService } from '@features/branch/services/branch.service';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-branch-view',
  templateUrl: './branch-view.component.html',
  styleUrls: ['./branch-view.component.css'],
})
export class BranchViewComponent {
  private readonly destroy$ = new Subject<void>();

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

  @Input() branch: Branch = {} as Branch;
  loading = true;
  branchForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcFilterDialogService: FcFilterDialogService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private branchService: BranchService
  ) {
    this.branch.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Branch View',
      icon: '',
      showHeader: true,
    });
    this.branchForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
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
    this.branchService.getBranch(this.branch.id).subscribe((res: any) => {
      this.branch = res.data;
      this.branchForm.patchValue({
        name: this.branch.name,
        address: this.branch.address,
      });
      this.loading = false;
    });
  }

  submit() {
    this.actionButtons[0].loading = true;
    const updatedData = this.branchForm.value;
    this.branchService.updateBranch(this.branch.id, updatedData).subscribe({
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
      message: 'Are you sure that you want to delete this branch?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.actionButtons[1].loading = true;
        this.branchService.deleteBranch(this.branch.id).subscribe({
          next: (res: any) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'success',
              header: 'Success',
              message: 'Branch deleted',
            });
            this.router.navigate(['/branch/list']);
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
}
