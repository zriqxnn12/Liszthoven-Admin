import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchAddDialogComponent } from './components/branch-add-dialog/branch-add-dialog.component';
import { BranchComponent } from './branch.component';
import { SharedModule } from '@shared/shared.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { BranchListComponent } from './pages/branch-list/branch-list.component';
import { BranchAddComponent } from './pages/branch-add/branch-add.component';
import { BranchViewComponent } from './pages/branch-view/branch-view.component';

@NgModule({
  declarations: [BranchComponent, BranchAddDialogComponent, BranchListComponent, BranchAddComponent, BranchViewComponent],
  imports: [
    CommonModule,
    BranchRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcTextareaModule,
  ],
  exports: [BranchAddDialogComponent],
})
export class BranchModule {}
