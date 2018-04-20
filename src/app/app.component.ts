import { Basket } from './components/basket/basket.model';
import { Bomb } from './components/bomb/bomb.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';

const SHUFFLE_BASKETS = 40; // seconds
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
  public personalBest = "";

  private intervalId;
  private maxBombs = 120;
  private timeElapsed = 0; // seconds
  private subject = new Subject<Bomb>();

  constructor(
  ) {}

  ngOnInit() {
    this.basketCollection = this.getBasketCollection();
    this.getPersonalBest();
    this.startShuffleTimer();
    this.startSpawingBombs();
  }


  ngOnDestroy() {
    // tslint:disable-next-line:no-unused-expression
    this.intervalId && clearInterval(this.intervalId);
  }

  getBasketCollection(): Array<Basket> {
    return TYPE_OF_OBJECTS.map(type => ({
      id: (new Date()).getMilliseconds(),
      type: type,
      model: []
    }));
  }

  destroyBomb(evt, bomb: Bomb) {
    const index = this.bombs.indexOf(bomb);
    this.bombs.splice(index, 1);
    this.points -= 1;
  }

  onBombCollected(evt) {
    const bomb = evt.bomb;
    const isSameType = evt.isSameType;

    const index = this.bombs.indexOf(bomb);
    if (index < 0) {
      // Bomb exploded before drop action
      return;
    }

    this.bombs.splice(index, 1);
    if (isSameType) {
      this.points += 1;
    } else {
      this.points -= 1;
    }
  }

  timeUntilShuffle() {
    return SHUFFLE_BASKETS - (this.timeElapsed % SHUFFLE_BASKETS);
  }

  private getPersonalBest() {
    const bestScoreLocal = window.localStorage.getItem('personalBest');
    this.personalBest =  bestScoreLocal || this.personalBest;
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

    this.subject.subscribe((bomb: Bomb) => {
      this.bombs.push(bomb);

      if (this.maxBombs > 1) {
        this.maxBombs -= 1;
        this.createNewBomb();
      } else {
        this.saveNewRecord();
      }
    });
  }

  private saveNewRecord() {
    if (this.points > parseInt(this.personalBest, 10)) {
      window.localStorage.setItem('personalBest', this.points.toString());
      this.personalBest = this.points.toString();
    }
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
