import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FcConfirmModule } from '@shared/components/fc-confirm/fc-confirm.module';
import { FcToastModule } from '@shared/components/fc-toast/fc-toast.module';
import { LottieModule } from 'ngx-lottie';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { StudentComponent } from './features/student/student.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { TeacherComponent } from './features/teacher/teacher.component';
import { StaffComponent } from './features/staff/staff.component';
import { ClassroomComponent } from './features/classroom/classroom.component';
import { BranchComponent } from './features/branch/branch.component';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
@NgModule({
  declarations: [AppComponent, StaffComponent, ClassroomComponent, BranchComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    FontAwesomeModule,
    SharedModule,
    ToastModule,
    FcToastModule,
    LottieModule.forRoot({ player: playerFactory }),
    FcConfirmModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
