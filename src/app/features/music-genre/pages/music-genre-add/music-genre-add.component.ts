import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MusicGenreService } from '@features/music-genre/services/music-genre.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FcToastService } from '@shared/components/fc-toast/fc-toast.service';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'app-music-genre-add',
  templateUrl: './music-genre-add.component.html',
  styleUrls: ['./music-genre-add.component.css'],
})
export class MusicGenreAddComponent {
  private readonly destroy$ = new Subject<void>();

  actionButtons: any[] = [
    {
      label: 'Save',
      icon: faSave,
      action: () => {
        this.submit();
      },
    },
  ];

  musicGenreForm!: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private fcToastService: FcToastService,
    private musicGenreService: MusicGenreService
  ) {
    this.layoutService.setHeaderConfig({
      title: 'Music Genre Add',
      icon: '',
      showHeader: true,
    });
    this.musicGenreForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.layoutService.setSearchConfig({ hide: true });
  }

  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    this.actionButtons[0].loading = true;
    const formValue = this.musicGenreForm.value;
    const bodyReq = {
      name: formValue.name,
      description: formValue.description,
    };

    this.musicGenreService.addMusicGenre(bodyReq).subscribe({
      next: (res: any) => {
        this.actionButtons[0].loading = false;
        this.fcToastService.clear();
        this.fcToastService.add({
          severity: 'success',
          header: 'Success',
          message: 'Music genre added successfully',
        });
        this.router.navigate(['/music-genre/list']);
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
}
