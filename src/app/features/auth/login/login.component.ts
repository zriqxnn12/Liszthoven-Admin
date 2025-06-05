import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { DarkModeService } from 'src/app/shared/services/dark-mode.service';

@Component({
  selector: 'fc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  darkMode: any;
  faSpinner = faSpinner;
  constructor(
    private authService: AuthService,
    private darkModeService: DarkModeService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.darkModeService.getDarkModeStatus.subscribe((darkMode) => {
      this.darkMode = darkMode;
    });
  }

  ngOnInit(): void {}
  get loginFormControl() {
    return this.loginForm.controls;
  }

  submit() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res) {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
      },
    });
    this.router.navigate(['/']);
  }
}
