import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '@features/student/services/student.service';
import { SupplierService } from '@features/supplier/services/supplier.service';
import {
  faPencil,
  faPlus,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent {
  private readonly destroy$ = new Subject<void>();
  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;
  actionButtons: any[] = [
    {
      label: 'Save',
      icon: faSave,
      action: () => {
        this.submit();
      },
    },
  ];
  registerForm: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private dialogService: DialogService,
    private studentService: StudentService,
    private fcToastService: FcToastService,
    private router: Router
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Student Add',
      icon: '',
      showHeader: true,
    });
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('asdqwe123'),
      phone_no: new FormControl(''),
      address: new FormControl(''),
      birth_place: new FormControl(''),
      birth_date: new FormControl(null),
      student: new FormGroup({
        gender: new FormControl('', Validators.required),
        religion: new FormControl(''),
        school: new FormControl(''),
        province: new FormControl(''),
        city: new FormControl(''),
        whatsapp_number: new FormControl(''),
        note: new FormControl(''),
      }),
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
    const formValue = { ...this.registerForm.value };

    if (formValue.student) {
      formValue.student = {
        gender: formValue.student.gender,
        religion: formValue.student.religion || '-',
        school: formValue.student.school || '-',
        province: formValue.student.province || '-',
        city: formValue.student.city || '-',
        whatsapp_number: formValue.student.whatsapp_number || '-',
        note: formValue.student.note || '-',
      };
    }

    this.studentService.addStudent(formValue).subscribe({
      next: (res: any) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Customer added successfully',
        });
        this.router.navigate(['/student/view/' + res.data.student.id]);
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
}
