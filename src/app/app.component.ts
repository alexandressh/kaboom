import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public bombs = ['bomb-type-one', 'bomb-type-one', 'bomb-type-three', 'bomb-type-two'];
  public basketOne = [];
  public basketTwo = [];
  public basketThree = [];

  constructor(
    private dragulaService: DragulaService
  ) {}

  ngOnInit() {
    const bombDrake = this.dragulaService.setOptions('bomb-bag', {
      accepts: (el, target, source, sibling) => {
        const isTypeOne = target.classList.contains('basket-one') && el.classList.contains('bomb-type-one');
        const isTypeTwo = target.classList.contains('basket-two') && el.classList.contains('bomb-type-two');
        const isTypeThree = target.classList.contains('basket-three') && el.classList.contains('bomb-type-three');
        return isTypeOne || isTypeTwo || isTypeThree;
      },
      moves: (el, target, source, sibling) => {
        return source.classList.contains('bomb');
      },
      copy: false,
      revertOnSpill: true
    });

    // this.dragulaService.drag.subscribe((value) => {
    //   console.log('drag', value);
    // });
    // this.dragulaService.drop.subscribe((value) => {
    //   this.addDroppedClass(value);
    //   console.log('drop', value);
    // });
    // this.dragulaService.over.subscribe((value) => {
    //   console.log('over', value);
    // });
    // this.dragulaService.out.subscribe((value) => {
    //   console.log('out', value);
    // });

    this.dragulaService.dropModel.subscribe((value) => {
      console.log('DROP MODEL', this.bombs, this.basketOne, this.basketTwo, this.basketThree);
    });
    this.dragulaService.removeModel.subscribe((value) => {
      console.log('REMOVE MODEL', this.bombs, this.basketOne, this.basketTwo, this.basketThree);
    });
  }

  private addDroppedClass(args) {
    const [e, el] = args;
    this.addClass(el, 'bomb-dropped');
  }

  private addClass(el: any, name: string) {
      el.className = el.className ? [el.className, name].join(' ') : name;
  }
}
