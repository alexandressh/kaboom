import { Bomb } from './../bomb/bomb.model';
import { Basket } from './basket.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  @Input() basket: Basket;
  @Output() bombCollected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  bombDropped(evt) {
    const bomb: Bomb = evt.dragData;

    const isSameType = bomb.type === this.basket.type;
    this.bombCollected.emit({
      bomb: bomb,
      isSameType: isSameType
    });
  }

}
