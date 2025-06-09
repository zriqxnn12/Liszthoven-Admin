import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from '@features/instrument/interfaces/instrument';
import { InstrumentService } from '@features/instrument/services/instrument.service';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-instrument-view',
  templateUrl: './instrument-view.component.html',
  styleUrls: ['./instrument-view.component.css'],
})
export class InstrumentViewComponent {
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

  @Input() instrument: Instrument = {} as Instrument;
  loading = true;

  instrumentForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService,
    private fcConfirmService: FcConfirmService,
    private instrumentService: InstrumentService
  ) {
    this.instrument.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Instrument View',
      icon: '',
      showHeader: true,
    });
    this.instrumentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
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
    this.instrumentService
      .getInstrument(this.instrument.id)
      .subscribe((res: any) => {
        this.loading = false;
        this.instrument = res.data;
        this.instrumentForm.patchValue({
          name: this.instrument.name,
          description: this.instrument.description,
        });
      });
  }

  submit() {
    this.actionButtons[0].loading = true;
    const updatedData = this.instrumentForm.value;
    const bodyreq = {
      name: updatedData.name,
      description: updatedData.description,
    };

    this.instrumentService
      .updateInstrument(this.instrument.id, bodyreq)
      .subscribe({
        next: () => {
          this.actionButtons[0].loading = false;
          this.fcToastService.add({
            severity: 'success',
            header: 'Success',
            message: 'Instrument updated successfully',
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
        this.instrumentService.deleteInstrument(this.instrument.id).subscribe({
          next: (res: any) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'success',
              header: 'Success',
              message: 'Instrument deleted',
            });
            this.router.navigate(['/instrument/list']);
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
}
