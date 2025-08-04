import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursePackageRoutingModule } from './course-package-routing.module';
import { CoursePackageListComponent } from './pages/course-package-list/course-package-list.component';
import { CoursePackageViewComponent } from './pages/course-package-view/course-package-view.component';
import { CoursePackageAddComponent } from './pages/course-package-add/course-package-add.component';
import { CoursePackageComponent } from './course-package.component';
import { SharedModule } from '@shared/shared.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { FcImagePreviewModule } from '@shared/components/fc-image-preview/fc-image-preview.module';
import { FcFileInputModule } from '@shared/components/fc-file-input/fc-file-input.module';
import { FcInputNumberModule } from '@shared/components/fc-input-number/fc-input-number.module';
import { FcDatepickerModule } from '@shared/components/fc-datepicker/fc-datepicker.module';
import { FcSelectOptionModule } from '@shared/components/fc-select-option/fc-select-option.module';
import { SelectCoursePackageDialogComponent } from './components/select-course-package-dialog/select-course-package-dialog.component';

@NgModule({
  declarations: [
    CoursePackageComponent,
    CoursePackageListComponent,
    CoursePackageViewComponent,
    CoursePackageAddComponent,
    SelectCoursePackageDialogComponent,
  ],
  imports: [
    CommonModule,
    CoursePackageRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcTextareaModule,
    FcImagePreviewModule,
    FcFileInputModule,
    FcInputNumberModule,
    FcDatepickerModule,
    FcSelectOptionModule,
  ],
  exports: [SelectCoursePackageDialogComponent],
})
export class CoursePackageModule {}
