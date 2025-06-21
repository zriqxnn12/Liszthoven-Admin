import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentComponent } from './instrument.component';
import { SharedModule } from '@shared/shared.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { InstrumentListComponent } from './pages/instrument-list/instrument-list.component';
import { InstrumentAddComponent } from './pages/instrument-add/instrument-add.component';
import { InstrumentViewComponent } from './pages/instrument-view/instrument-view.component';
import { SelectInstrumentDialogComponent } from './components/select-instrument-dialog/select-instrument-dialog.component';

@NgModule({
  declarations: [InstrumentComponent, InstrumentListComponent, InstrumentAddComponent, InstrumentViewComponent, SelectInstrumentDialogComponent],
  imports: [
    CommonModule,
    InstrumentRoutingModule,
    SharedModule,
    FcPaginationModule,
    FcInputTextModule,
    FcTextareaModule,
  ],
})
export class InstrumentModule {}
