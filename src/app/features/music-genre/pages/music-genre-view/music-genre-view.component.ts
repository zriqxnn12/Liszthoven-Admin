import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicGenre } from '@features/music-genre/interfaces/music-genre';
import { MusicGenreService } from '@features/music-genre/services/music-genre.service';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FcConfirmService } from '@shared/components/fc-confirm/fc-confirm.service';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-music-genre-view',
  templateUrl: './music-genre-view.component.html',
  styleUrls: ['./music-genre-view.component.css'],
})
export class MusicGenreViewComponent {
  private readonly destroy$ = new Subject<void>();

  actionButtons: any[] = [
    {
      label: 'Save',
      icon: faSave,
      action: () => {
        this.submit();
      },
    },
    {
      label: 'Delete',
      icon: faTrash,
      action: () => {
        this.delete();
      },
    },
  ];

  @Input() musicGenre: MusicGenre = {} as MusicGenre;
  loading = true;
  musicGenreForm!: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private fcToastService: FcToastService,
    private fcConfirmService: FcConfirmService,
    private musicGenreService: MusicGenreService
  ) {
    this.musicGenre.id = Number(this.route.snapshot.paramMap.get('id'));
    this.layoutService.setHeaderConfig({
      title: 'Music Genre View',
      icon: '',
      showHeader: true,
    });
    this.musicGenreForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
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

  loadData() {
    this.loading = true;
    this.musicGenreService
      .getMusicGenre(this.musicGenre.id)
      .subscribe((res: any) => {
        this.loading = false;
        this.musicGenre = res.data;
        this.musicGenreForm.patchValue({
          name: this.musicGenre.name,
          description: this.musicGenre.description,
        });
      });
  }

  submit() {
    this.actionButtons[0].loading = true;
    const updatedData = this.musicGenreForm.value;
    const bodyreq = {
      name: updatedData.name,
      description: updatedData.description,
    };

    this.musicGenreService
      .updateMusicGenre(this.musicGenre.id, bodyreq)
      .subscribe({
        next: () => {
          this.actionButtons[0].loading = false;
          this.fcToastService.add({
            severity: 'success',
            header: 'Success',
            message: 'Music genre updated successfully',
          });
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

  delete() {
    this.fcConfirmService.open({
      message: 'Are you sure that you want to delete this classroom?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.actionButtons[1].loading = true;
        this.musicGenreService.deleteMusicGenre(this.musicGenre.id).subscribe({
          next: (res: any) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'success',
              header: 'Success',
              message: 'Music genre deleted',
            });
            this.router.navigate(['/music-genre/list']);
          },
          error: (err) => {
            this.actionButtons[1].loading = false;
            this.fcToastService.clear();
            this.fcToastService.add({
              severity: 'error',
              header: 'Error',
              message: err.message,
            });
          },
        });
      },
    });
  }
}
