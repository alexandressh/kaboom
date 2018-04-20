import { Directive, ElementRef } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Directive({
  selector: '[appRandomPosition]'
})
export class RandomPositionDirective {

  constructor(
    private el: ElementRef,
    private utilsService: UtilsService
  ) {
    this.changeElementPosition();
  }

  changeElementPosition() {
    const maxWidht = window.innerWidth - 100;
    const maxHeight = Math.floor(window.innerHeight * 0.7) - 100;
    const top = this.utilsService.getRandomInt(maxHeight);
    const left = this.utilsService.getRandomInt(maxWidht);

    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.top = `${top}px`;
    this.el.nativeElement.style.left = `${left}px`;
  }



}
