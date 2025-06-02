import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';
import { FcLoadingComponent } from './fc-loading.component';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [FcLoadingComponent],
  imports: [CommonModule, LottieModule],
  exports: [FcLoadingComponent],
})
export class FcLoadingModule {}
