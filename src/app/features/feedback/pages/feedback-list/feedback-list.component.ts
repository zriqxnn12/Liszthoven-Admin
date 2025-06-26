import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '@features/feedback/interfaces/feedback';
import { FeedbackService } from '@features/feedback/services/feedback.service';
import {
  faCalendarDays,
  faClock,
  faEye,
  faLocationDot,
  faPlus,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css'],
})
export class FeedbackListComponent {
  private readonly destroy$ = new Subject<void>();
  faEye = faEye;
  faLocationDot = faLocationDot;
  faCalendarDays = faCalendarDays;
  faClock = faClock;

  actionButtons: any[] = [];
  filterButtons: any[] = [
    {
      label: 'Refresh',
      icon: faRefresh,
      action: () => {
        this.loadData();
      },
    },
  ];

  feedbacks: Feedback[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;
  constructor(
    private layoutService: LayoutService,
    private feedbackService: FeedbackService,
    private router: Router
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Feedback',
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
    let dataListParameter: DataListParameter = {} as DataListParameter;
    dataListParameter.rows = this.rows;
    dataListParameter.page = this.page;
    dataListParameter.sortBy = 'order_by=id&direction=desc&with_filter=1';

    this.feedbackService
      .getFeedbacks(dataListParameter)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.feedbacks = res.data.feedbacks;
          this.totalRecords = res.data.count;
          this.totalPages =
            this.totalRecords > this.rows
              ? Math.ceil(this.totalRecords / this.rows)
              : 1;
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  navigateToDetail(feedback: Feedback) {
    this.router.navigate(['/feedback/view/', feedback.id]);
  }
}
