import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from '@features/branch/interfaces/branch';
import { BranchService } from '@features/branch/services/branch.service';
import {
  faBuilding,
  faEye,
  faLocationDot,
  faPlus,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FcFilterDialogService } from '@shared/components/fc-filter-dialog/services/fc-filter-dialog.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css'],
})
export class BranchListComponent {
  private readonly destroy$ = new Subject<void>();
  faBuilding = faBuilding;
  faEye = faEye;
  faLocationDot = faLocationDot;

  actionButtons: any[] = [
    {
      label: 'Add',
      icon: faPlus,
      route: ['/branch/add'],
      action: () => {
        // this.navigateToAdd();
      },
    },
  ];

  filterButtons: any[] = [
    {
      label: 'Refresh',
      icon: faRefresh,
      action: () => {
        this.loadData();
      },
    },
    // {
    //   label: 'Filter',
    //   icon: faFilter,
    //   action: () => {},
    // },
    // {
    //   label: 'Quick View',
    //   icon: faBars,
    //   action: () => {},
    // },
  ];

  branches: Branch[] = [];
  loading: boolean = false;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcFilterDialogService: FcFilterDialogService,
    private dialogService: DialogService,
    private branchService: BranchService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Branches',
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

  loadData() {
    this.loading = true;
    this.branchService
      .getBranches()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.branches = res.data.branches;
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

  navigateToDetail(branch: Branch) {
    this.router.navigate(['/branch/view/', branch.id]);
  }
}
