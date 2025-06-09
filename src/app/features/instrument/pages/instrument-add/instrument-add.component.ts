import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstrumentService } from '@features/instrument/services/instrument.service';
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
  selector: 'app-instrument-add',
  templateUrl: './instrument-add.component.html',
  styleUrls: ['./instrument-add.component.css'],
})
export class InstrumentAddComponent {
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

  instrumentForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService,
    private instrumentService: InstrumentService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Instrument Add',
      icon: '',
      showHeader: true,
    });
    this.instrumentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
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
    const formValue = this.instrumentForm.value;
    const bodyReq = {
      name: formValue.name,
      description: formValue.description,
    };

    this.instrumentService.addInstrument(bodyReq).subscribe({
      next: (res: any) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Instrument added successfully',
        });
        this.router.navigate(['/instrument/list']);
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
}
