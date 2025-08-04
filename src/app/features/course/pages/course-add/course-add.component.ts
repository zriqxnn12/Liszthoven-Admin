import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchSelectDialogComponent } from '@features/branch/components/branch-select-dialog/branch-select-dialog.component';
import { SelectCoursePackageDialogComponent } from '@features/course-package/components/select-course-package-dialog/select-course-package-dialog.component';
import { CourseService } from '@features/course/services/course.service';
import { SelectInstrumentDialogComponent } from '@features/instrument/components/select-instrument-dialog/select-instrument-dialog.component';
import { MusicGenreSelectDialogComponent } from '@features/music-genre/components/music-genre-select-dialog/music-genre-select-dialog.component';
import { SelectStudentDialogComponent } from '@features/student/components/select-student-dialog/select-student-dialog.component';
import {
  faChevronDown,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css'],
})
export class CourseAddComponent {
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

  courseForm!: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private dialogService: DialogService,
    private courseService: CourseService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Course Registration',
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
    this.layoutService.setSearchConfig({ hide: true });
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    this.actionButtons[0].loading = true;
    let course = this.courseForm.value;
    let payload = {
      student_id: course.student.id,
      instrument_id: course.instrument.id,
      course_package_id: course.course_package.id,
      music_genre_id: course.music_genre.id,
      branch_id: course.branch.id,
      is_active: course.is_active,
      description: course.description,
    };

    this.courseService.addCourse(payload).subscribe({
      next: (res: any) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Course added successfully',
        });
        this.router.navigate(['/course/list']);
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
