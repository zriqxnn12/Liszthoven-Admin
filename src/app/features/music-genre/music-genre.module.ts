import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicGenreRoutingModule } from './music-genre-routing.module';
import { MusicGenreListComponent } from './pages/music-genre-list/music-genre-list.component';
import { MusicGenreAddComponent } from './pages/music-genre-add/music-genre-add.component';
import { MusicGenreViewComponent } from './pages/music-genre-view/music-genre-view.component';
import { MusicGenreComponent } from './music-genre.component';
import { SharedModule } from '@shared/shared.module';
import { FcInputTextModule } from '@shared/components/fc-input-text/fc-input-text.module';
import { FcTextareaModule } from '@shared/components/fc-textarea/fc-textarea.module';
import { FcPaginationModule } from '@shared/components/fc-pagination/fc-pagination.module';
import { MusicGenreSelectDialogComponent } from './components/music-genre-select-dialog/music-genre-select-dialog.component';

@NgModule({
  declarations: [
    MusicGenreComponent,
    MusicGenreListComponent,
    MusicGenreAddComponent,
    MusicGenreViewComponent,
    MusicGenreSelectDialogComponent,
  ],
  imports: [
    CommonModule,
    MusicGenreRoutingModule,
    SharedModule,
    FcInputTextModule,
    FcTextareaModule,
    FcPaginationModule,
  ],
  exports: [MusicGenreSelectDialogComponent],
})
export class MusicGenreModule {}
