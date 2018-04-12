import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomIntMinAndMax(min, max) {
    return this.getRandomInt(max - min) + min;
  }

}
