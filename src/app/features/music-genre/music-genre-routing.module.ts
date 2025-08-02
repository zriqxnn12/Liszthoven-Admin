import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicGenreComponent } from './music-genre.component';
import { MusicGenreListComponent } from './pages/music-genre-list/music-genre-list.component';
import { MusicGenreAddComponent } from './pages/music-genre-add/music-genre-add.component';
import { MusicGenreViewComponent } from './pages/music-genre-view/music-genre-view.component';

const routes: Routes = [
  {
    path: '',
    component: MusicGenreComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: MusicGenreListComponent,
      },
      {
        path: 'add',
        component: MusicGenreAddComponent,
      },
      {
        path: 'view/:id',
        component: MusicGenreViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicGenreRoutingModule {}
