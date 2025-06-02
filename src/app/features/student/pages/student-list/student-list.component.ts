import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '@features/supplier/services/supplier.service';
import {
  faBars,
  faBuilding,
  faEye,
  faFilter,
  faLocationDot,
  faPhone,
  faPlus,
  faRefresh,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  private readonly destroy$ = new Subject<void>();
  faLocationDot = faLocationDot;
  faUser = faUser;
  faPhone = faPhone;
  faEye = faEye;
  faBuilding = faBuilding;
  quickView = false;

  actionButtons: any[] = [
    {
      label: 'Add',
      icon: faPlus,
      route: [],
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
    {
      label: 'Filter',
      icon: faFilter,
      action: () => {},
    },
    {
      label: 'Quick View',
      icon: faBars,
      action: () => {},
    },
  ];

  loading: boolean = false;
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;
  searchQuery: string = '';

  constructor(
    private layoutService: LayoutService,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Students',
      icon: '',
      showHeader: true,
    });
  }
}
