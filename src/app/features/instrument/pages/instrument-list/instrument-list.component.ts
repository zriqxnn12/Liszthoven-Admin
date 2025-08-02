import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from '@features/instrument/interfaces/instrument';
import { InstrumentService } from '@features/instrument/services/instrument.service';
import {
  faEye,
  faMusic,
  faPlus,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.css'],
})
export class InstrumentListComponent {
  private readonly destroy$ = new Subject<void>();
  faEye = faEye;
  faMusic = faMusic;

  actionButtons: any[] = [
    {
      label: 'Add',
      icon: faPlus,
      route: ['/instrument/add'],
      action: () => {},
    },
  ];
  filterButtons: any[] = [
    {
      label: 'Refresh',
      icon: faRefresh,
      action: () => {
        // this.loadData();
      },
    },
  ];

  instruments: Instrument[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService,
    private instrumentService: InstrumentService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Instruments',
      icon: '',
      showHeader: true,
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

  loadData(page: number = 0, searchQuery: string = this.searchQuery) {
    this.loading = true;
    let dataListParameter: DataListParameter = {} as DataListParameter;
    dataListParameter.rows = this.rows;
    dataListParameter.page = this.page;
    dataListParameter.sortBy = 'order_by=id&direction=desc&with_filter=1';
    dataListParameter.searchQuery = searchQuery;
    this.instrumentService
      .getInstruments(dataListParameter)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.totalRecords = res.data.count;
          this.totalPages =
            this.totalRecords > this.rows
              ? Math.ceil(this.totalRecords / this.rows)
              : 1;
          this.instruments = res.data.instruments;
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  onPageUpdate(pagination: any) {
    let page = pagination.page;
    let rows = pagination.rows;
    this.rows = rows;
    if (page > 0) {
      this.page = page;
    } else {
      this.page = 1;
    }
    this.loadData(this.page);
  }

  navigateToDetail(instrument: Instrument) {
    this.router.navigate(['/instrument/view/', instrument.id]);
  }
}
