import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchSelectDialogComponent } from '@features/branch/components/branch-select-dialog/branch-select-dialog.component';
import { SelectCoursePackageDialogComponent } from '@features/course-package/components/select-course-package-dialog/select-course-package-dialog.component';
import { Course } from '@features/course/interfaces/course';
import { CourseService } from '@features/course/services/course.service';
import { SelectInstrumentDialogComponent } from '@features/instrument/components/select-instrument-dialog/select-instrument-dialog.component';
import { MusicGenreSelectDialogComponent } from '@features/music-genre/components/music-genre-select-dialog/music-genre-select-dialog.component';
import { SelectStudentDialogComponent } from '@features/student/components/select-student-dialog/select-student-dialog.component';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css'],
})
export class CourseViewComponent {
  private readonly destroy$ = new Subject<void>();
  faTimes = faTimes;
  faChevronDown = faChevronDown;

  actionButtons: any[] = [];
  @Input() course: Course = {} as Course;
  courseForm!: FormGroup;
  loading = true;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private courseService: CourseService
  ) {
    this.course.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Course View',
      icon: '',
      showHeader: true,
    });
    this.courseForm = new FormGroup({
      student: new FormControl(null, Validators.required),
      instrument: new FormControl(null, Validators.required),
      course_package: new FormControl(null, Validators.required),
      music_genre: new FormControl(null, Validators.required),
      branch: new FormControl(null, Validators.required),
      is_active: new FormControl(true, Validators.required),
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
    this.courseService.getCourse(this.course.id).subscribe((res: any) => {
      this.course = res.data;
      this.courseForm.patchValue({
        student: this.course.student,
        instrument: this.course.instrument,
        course_package: this.course.course_package,
        music_genre: this.course.music_genre,
        branch: this.course.branch,
        is_active: this.course.is_active,
        description: this.course.description,
      });
    });
  }

  onSelectStudent() {
    const ref = this.dialogService.open(SelectStudentDialogComponent, {
      data: {
        title: 'Select Student',
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '450px',
    });
    ref.onClose.subscribe((student) => {
      if (student) {
        this.courseForm.patchValue({
          student: student,
        });
      }
    });
  }

  removeStudent() {
    this.courseForm.patchValue({
      student: null,
    });
  }

  onSelectInstrument() {
    const ref = this.dialogService.open(SelectInstrumentDialogComponent, {
      data: {
        title: 'Select Instrument',
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '450px',
    });
    ref.onClose.subscribe((instrument) => {
      if (instrument) {
        this.courseForm.patchValue({
          instrument: instrument,
        });
      }
    });
  }

  removeInstrument() {
    this.courseForm.patchValue({
      instrument: null,
    });
  }

  onSelectMusicGenre() {
    const ref = this.dialogService.open(MusicGenreSelectDialogComponent, {
      data: {
        title: 'Select Music Genre',
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '450px',
    });
    ref.onClose.subscribe((musicGenre) => {
      if (musicGenre) {
        this.courseForm.patchValue({
          music_genre: musicGenre,
        });
      }
    });
  }

  removeMusicGenre() {
    this.courseForm.patchValue({
      music_genre: null,
    });
  }

  onSelectCoursePackage() {
    const ref = this.dialogService.open(SelectCoursePackageDialogComponent, {
      data: {
        title: 'Select Course Package',
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '450px',
    });
    ref.onClose.subscribe((coursePackage) => {
      if (coursePackage) {
        this.courseForm.patchValue({
          course_package: coursePackage,
        });
      }
    });
  }

  removeCoursePackage() {
    this.courseForm.patchValue({
      course_package: null,
    });
  }

  onSelectBranch() {
    const ref = this.dialogService.open(BranchSelectDialogComponent, {
      data: {
        title: 'Select Branch',
      },
      showHeader: false,
      contentStyle: {
        padding: '0',
      },
      style: {
        overflow: 'hidden',
      },
      styleClass: 'rounded-sm',
      dismissableMask: true,
      width: '450px',
    });
    ref.onClose.subscribe((branch) => {
      if (branch) {
        this.courseForm.patchValue({
          branch: branch,
        });
      }
    });
  }

  removeBranch() {
    this.courseForm.patchValue({
      branch: null,
    });
  }
}
