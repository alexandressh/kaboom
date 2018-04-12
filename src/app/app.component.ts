import { Component, OnInit, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public bombs = ['bomb-type-one', 'bomb-type-one', 'bomb-type-three', 'bomb-type-two'];
  public basketCollection = [{
    name: 'basket-one',
    model: []
  }, {
    name: 'basket-two',
    model: []
  }, {
    name: 'basket-three',
    model: []
  }];
  public points = 0;
  public timeToShuffle = 40;
  private intervalId;

  constructor(
    private dragulaService: DragulaService
  ) {}

  ngOnInit() {
    this.startShuffleTimer();
    this.basketCollection = _.shuffle(this.basketCollection);

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
      this.points += 1;
      this.basketCollection = _.shuffle(this.basketCollection);
    });
    this.dragulaService.removeModel.subscribe((value) => {
      console.log('REMOVE MODEL');
    });
  }

  ngOnDestroy() {
    // tslint:disable-next-line:no-unused-expression
    this.intervalId && clearInterval(this.intervalId);
  }

  private addDroppedClass(args) {
    const [e, el] = args;
    this.addClass(el, 'bomb-dropped');
  }

  private addClass(el: any, name: string) {
      el.className = el.className ? [el.className, name].join(' ') : name;
  }

  private startShuffleTimer() {
    this.intervalId = setInterval(() => {
      this.timeToShuffle -= 1;
      if (this.timeToShuffle <= 0) {
        this.basketCollection = _.shuffle(this.basketCollection);
        this.timeToShuffle = 40;
      }
    }, 1000);
  }

  destroyBomb(evt, bomb) {
    this.bombs.splice(this.bombs.indexOf(bomb), 1);
    this.points -= 1;
  }
}
