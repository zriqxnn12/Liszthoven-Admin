import { Component } from '@angular/core';
import { Instrument } from '@features/instrument/interfaces/instrument';
import { InstrumentService } from '@features/instrument/services/instrument.service';
import {
  faBuilding,
  faLocationDot,
  faMusic,
  faPhone,
  faPlus,
  faRefresh,
  faSearch,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-instrument-dialog',
  templateUrl: './select-instrument-dialog.component.html',
  styleUrls: ['./select-instrument-dialog.component.css'],
})
export class SelectInstrumentDialogComponent {
  private readonly destroy$: any = new Subject();
  // Icons
  faTimes = faTimes;
  faRefresh = faRefresh;
  faUser = faUser;
  faPhone = faPhone;
  faLocationDot = faLocationDot;
  faPlus = faPlus;
  faBuilding = faBuilding;
  faSearch = faSearch;
  faMusic = faMusic;

  instruments: Instrument[] = [];
  searchQuery: string = '';
  loading = false;
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;
  title = '';
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fcFilterDialogService: FcFilterDialogService,
    private instrumentService: InstrumentService
  ) {
    if (this.config.data.title) {
      this.title = this.config.data.title;
    }
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.loading = false;
        this.instruments = res.data.instruments;
        this.totalRecords = res.data.count;
        this.totalPages =
          this.totalRecords > this.rows
            ? Math.ceil(this.totalRecords / this.rows)
            : 1;
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

  search() {
    this.page = 1;
    this.loadData(this.page);
  }

  submit(instrument: Instrument) {
    this.ref.close(instrument);
  }
  onClose() {
    this.ref.close();
  }
}
