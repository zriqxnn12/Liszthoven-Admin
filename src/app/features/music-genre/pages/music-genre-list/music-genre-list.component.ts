import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MusicGenre } from '@features/music-genre/interfaces/music-genre';
import { MusicGenreService } from '@features/music-genre/services/music-genre.service';
import {
  faEye,
  faMusic,
  faPlus,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { DataListParameter } from '@shared/interfaces/data-list-parameter.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-music-genre-list',
  templateUrl: './music-genre-list.component.html',
  styleUrls: ['./music-genre-list.component.css'],
})
export class MusicGenreListComponent {
  private readonly destroy$ = new Subject<void>();
  faEye = faEye;
  faMusic = faMusic;

  actionButtons: any[] = [
    {
      label: 'Add',
      icon: faPlus,
      route: ['/music-genre/add'],
      action: () => {},
    },
  ];
  filterButtons: any[] = [
    {
      label: 'Refresh',
      icon: faRefresh,
      action: () => {
        // this.loadData();
      },
    },
  ];

  musicGenres: MusicGenre[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  totalRecords = 0;
  totalPages = 1;
  page = 1;
  rows = 10;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private musicGenreService: MusicGenreService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Music Genres',
      icon: '',
      showHeader: true,
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

  loadData(page: number = 0, searchQuery: string = this.searchQuery) {
    this.loading = true;
    let dataListParameter: DataListParameter = {} as DataListParameter;
    dataListParameter.rows = this.rows;
    dataListParameter.page = this.page;
    dataListParameter.sortBy = 'order_by=id&direction=desc&with_filter=1';
    dataListParameter.searchQuery = searchQuery;

    this.musicGenreService
      .getMusicGenres(dataListParameter)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.totalRecords = res.data.count;
          this.totalPages =
            this.totalRecords > this.rows
              ? Math.ceil(this.totalRecords / this.rows)
              : 1;
          this.musicGenres = res.data.genres;
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
          this.layoutService.setSearchConfig({
            loading: false,
          });
        },
      });
  }

  navigateToDetail(musicGenre: MusicGenre) {
    this.router.navigate(['/music-genre/view/', musicGenre.id]);
  }

  onPageUpdate(pagination: any) {
    let page = pagination.page;
    let rows = pagination.rows;
    this.rows = rows;
    if (page > 0) {
      this.page = page;
    } else {
      this.page = 1;
    }
    this.loadData(this.page);
  }
}
