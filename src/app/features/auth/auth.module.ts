import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { PasswordModule } from 'primeng/password';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PasswordModule,
    SharedModule,
    FcInputTextModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
