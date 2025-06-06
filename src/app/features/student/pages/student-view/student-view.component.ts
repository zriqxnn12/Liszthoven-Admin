import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from '@features/student/interfaces/student';
import { StudentService } from '@features/student/services/student.service';
import {
  faCloudArrowUp,
  faPencil,
  faPlus,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})
export class StudentViewComponent {
  private readonly destroy$ = new Subject<void>();

  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;
  faCloudArrowUp = faCloudArrowUp;

  actionButtons: any[] = [
    {
      label: 'Save',
      icon: faSave,
      action: () => {
        this.submit();
      },
    },
    {
      label: 'Delete',
      icon: faTrash,
      action: () => {
        this.delete();
      },
    },
  ];

  gender = [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
  ];

  religion = [
    {
      label: 'Islam',
      value: 'Islam',
    },
    {
      label: 'Christianity',
      value: 'Christianity',
    },
    {
      label: 'Catholic',
      value: 'Catholic',
    },
    {
      label: 'Hinduism',
      value: 'Hinduism',
    },
    {
      label: 'Buddhism',
      value: 'Buddhism',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ];

  @Input() student: Student = {} as Student;
  @Input() quickView: Boolean = false;
  loading = true;
  studentForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private dialogService: DialogService,
    private studentService: StudentService
  ) {
    this.student.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Student View',
      icon: '',
      showHeader: true,
    });
    this.studentForm = new FormGroup({
      gender: new FormControl('', Validators.required),
      religion: new FormControl(''),
      school: new FormControl(''),
      province: new FormControl(''),
      city: new FormControl(''),
      whatsapp_number: new FormControl(''),
      note: new FormControl(''),
      user: new FormGroup({
        name: new FormControl('', Validators.required),
        phone_no: new FormControl(''),
        address: new FormControl(''),
        birth_place: new FormControl(''),
        birth_date: new FormControl(null),
      }),
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

  get userForm(): FormGroup {
    return this.studentForm.get('user') as FormGroup;
  }

  loadData() {
    this.loading = true;
    this.studentService.getStudent(this.student.id).subscribe((res: any) => {
      this.student = res.data;
      this.studentForm.patchValue({
        gender: this.student.gender,
        religion: this.student.religion,
        school: this.student.school,
        province: this.student.province,
        city: this.student.city,
        note: this.student.note,
        whatsapp_number: this.student.whatsapp_number,
      });
      this.userForm.patchValue({
        name: this.student.user.name,
        phone_no: this.student.user.phone_no,
        address: this.student.user.address,
        birth_place: this.student.user.birth_place,
        birth_date: this.student.user.birth_date,
      });
      this.loading = false;
    });
  }

  submit() {
    this.actionButtons[0].loading = true;
    const updatedData = this.studentForm.value;
    this.studentService.updateStudent(this.student.id, updatedData).subscribe({
      next: () => {
        this.actionButtons[0].loading = false;
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Student updated successfully',
        });
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

  delete() {
    this.fcConfirmService.open({
      message: 'Are you sure that you want to delete this student?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.actionButtons[1].loading = true;
        this.studentService.deleteStudent(this.student.id).subscribe({
          next: (res: any) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'success',
              header: 'Success',
              message: res.message,
            });
          },
          error: (err) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'error',
              header: 'Student',
              message: err.message,
            });
          },
        });
      },
    });
  }
}
