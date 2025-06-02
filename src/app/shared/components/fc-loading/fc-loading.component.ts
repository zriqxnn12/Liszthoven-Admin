import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'fc-loading',
  templateUrl: './fc-loading.component.html',
  styleUrls: ['./fc-loading.component.css'],
})
export class FcLoadingComponent {
  lottieOption = {
    path: `/assets/lotties/loading.json`,
    loop: true,
  };
  animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(1.5);
  }
}
