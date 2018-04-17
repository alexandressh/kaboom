import { Basket } from './components/basket/basket.model';
import { Bomb } from './components/bomb/bomb.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';

const SHUFFLE_BASKETS = 10;
const TYPE_OF_OBJECTS = ['js-type-one', 'js-type-two', 'js-type-three'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public bombs: Array<Bomb> = [];
  public basketCollection: Array<Basket>;
  public points = 0;

  private intervalId;
  private maxBombs = 120;
  private timeElapsed = 0;
  private subject = new Subject<Bomb>();

  constructor(
    private dragulaService: DragulaService
  ) {}

  ngOnInit() {
    this.basketCollection = TYPE_OF_OBJECTS.map(type => ({
      id: (new Date()).getMilliseconds(),
      type: type,
      model: []
    }));

    this.startShuffleTimer();
    this.startSpawingBombs();
    const bombDrake = this.dragulaService.setOptions('bomb-bag', {
      accepts: (el, target, source, sibling) => {
        return true;
      },
      moves: (el, target, source, sibling) => {
        return source.classList.contains('bomb');
      },
      copy: false,
      revertOnSpill: true
    });

    this.dragulaService.cloned.subscribe((args) => {
    });

    this.dragulaService.drag.subscribe(el => {
    });

    this.dragulaService.dropModel.subscribe((args) => {
      console.log('DROPPED', this.bombs);
      const [el, source, target] = args;

      if (this.isBombAndBasketOfSameType(source, target)) {
        this.points += 1;
      } else {
        this.points -= 1;
      }
    });

    this.dragulaService.removeModel.subscribe(args => {
      console.log('REMOVED', this.bombs);
    });
  }


  ngOnDestroy() {
    // tslint:disable-next-line:no-unused-expression
    this.intervalId && clearInterval(this.intervalId);
  }

  destroyBomb(evt, bomb) {
    this.points -= 1;
  }

  timeUntilShuffle() {
    return SHUFFLE_BASKETS - (this.timeElapsed % SHUFFLE_BASKETS);
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
      if (this.timeUntilShuffle() <= 1) {

        const shuffled = _.shuffle(this.basketCollection).map(basket => basket.type);
        this.basketCollection[0].type = shuffled[0];
        this.basketCollection[1].type = shuffled[1];
        this.basketCollection[2].type = shuffled[2];
      }
      this.timeElapsed += 1;
    }, 1000);
  }

  private startSpawingBombs() {
    this.createNewBomb(100);

    this.subject.subscribe(
      (bomb: Bomb) => {
        this.bombs.push(bomb);
        if (this.maxBombs > 1) {
          this.maxBombs -= 1;
          this.createNewBomb();
        }
      });

    }

  private isBombAndBasketOfSameType(bombEl: HTMLElement, basketEl: HTMLElement): boolean {
    const isTypeOne = bombEl.classList.contains('js-type-one') && basketEl.classList.contains('js-type-one');
    const isTypeTwo = bombEl.classList.contains('js-type-two') && basketEl.classList.contains('js-type-two');
    const isTypeThree = bombEl.classList.contains('js-type-three') && basketEl.classList.contains('js-type-three');
    return isTypeOne || isTypeTwo || isTypeThree;
  }

  private createNewBomb(time?: number): void {
    const timeToSpawn = time || this.spawningTimer();

    setTimeout(() => {
      const spawnedBomb: Bomb =  {
        id: (new Date()).getMilliseconds(),
        type: _.shuffle(TYPE_OF_OBJECTS)[0]
      };

      this.subject.next(spawnedBomb);
    }, timeToSpawn);
  }

  // Check https://courses.lumenlearning.com/precalcone/chapter/write-the-equation-for-a-linear-function-from-the-graph-of-a-line/
  private spawningTimer(): number {
    return Math.floor((-41.25 * this.timeElapsed) + 5050);
  }
}
