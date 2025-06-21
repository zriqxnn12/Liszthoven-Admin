import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from '@features/instrument/services/instrument.service';
import { ServiceInvoice } from '@features/service-invoice/interfaces/service-invoice';
import { ServiceInvoiceService } from '@features/service-invoice/services/service-invoice.service';
import { faEye, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-service-invoice-list',
  templateUrl: './service-invoice-list.component.html',
  styleUrls: ['./service-invoice-list.component.css'],
})
export class ServiceInvoiceListComponent {
  private readonly destroy$ = new Subject<void>();
  faEye = faEye;

  actionButtons: any[] = [
    {
      label: 'Add',
      icon: faPlus,
      route: ['/service-invoice/add'],
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

  serviceInvoices: ServiceInvoice[] = [];
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
    private serviceInvoiceService: ServiceInvoiceService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Service Invoices',
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
    this.serviceInvoiceService
      .getServiceInvoices(dataListParameter)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.totalRecords = res.data.count;
          this.totalPages =
            this.totalRecords > this.rows
              ? Math.ceil(this.totalRecords / this.rows)
              : 1;
          this.serviceInvoices = res.data.service_invoices;
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

  getStatusColor(status: number): string {
    switch (status) {
      case 0:
        return 'border border-gray-600 dark:border-gray-700 bg-gray-100 dark:bg-gray-700/20 text-gray-500';
      case 1:
        return 'border border-blue-600 dark:border-blue-700 bg-blue-100 dark:bg-blue-700/20 text-blue-500';
      case 2:
        return 'border border-green-600 dark:border-green-700 bg-green-100 dark:bg-green-700/20 text-green-500';
      case 3:
        return 'border border-emerald-600 dark:border-emerald-700 bg-emerald-100 dark:bg-emerald-700/20 text-emerald-500';
      default:
        return '';
    }
  }

  navigateToDetail(serviceInvoice: ServiceInvoice) {
    this.router.navigate(['/service-invoice/view/', serviceInvoice.id]);
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
}
