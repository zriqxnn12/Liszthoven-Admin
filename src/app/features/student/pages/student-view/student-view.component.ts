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
        // this.submit();
      },
    },
    {
      label: 'Delete',
      icon: faTrash,
      action: () => {
        // this.delete();
      },
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
        email: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        phone_no: new FormControl(''),
        address: new FormControl(''),
        birth_place: new FormControl(''),
        birth_date: new FormControl(null),
        profile_file_path: new FormControl(null),
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
        email: this.student.user.email,
        username: this.student.user.username,
        phone_no: this.student.user.phone_no,
        address: this.student.user.address,
        birth_place: this.student.user.birth_place,
        birth_date: this.student.user.birth_date,
        profile_file_path: this.student.user.profile_file_path,
      });
      this.loading = false;
    });
  }
}
