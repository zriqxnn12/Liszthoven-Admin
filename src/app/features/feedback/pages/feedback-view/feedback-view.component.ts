import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from '@features/feedback/interfaces/feedback';
import { FeedbackService } from '@features/feedback/services/feedback.service';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.css'],
})
export class FeedbackViewComponent {
  private readonly destroy$ = new Subject<void>();
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

  @Input() feedback: Feedback = {} as Feedback;
  loading = true;
  feedbackForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private feedbackService: FeedbackService
  ) {
    this.feedback.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Feedback View',
      icon: '',
      showHeader: true,
    });
    this.feedbackForm = new FormGroup({
      name: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
      is_anonymous: new FormControl(false, Validators.required),
      created_at: new FormControl(new Date(), Validators.required),
      user: new FormControl(null, Validators.required),
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
    this.feedbackService.getFeedback(this.feedback.id).subscribe((res: any) => {
      this.loading = false;
      this.feedback = res.data;
      this.feedbackForm.patchValue({
        name: this.feedback.name,
        note: this.feedback.note,
        created_at: this.feedback.created_at,
        is_anonymous: this.feedback.is_anonymous,
        user: this.feedback.user,
      });
    });
  }
}
