import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { Basket } from './basket.model';
import { Bomb } from '../bomb/bomb.model';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  const basket: Basket = {
    id: 123456,
    model: [],
    type: 'js-type-one'
  };
  const bombTypeOne: Bomb = {
    type: 'js-type-one',
    id: 123456
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    component.basket = basket;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should check if bomb is same type as the basket', () => {
    const evt = {
      dragData: bombTypeOne
    };

    component.checkIfCompatible(evt);
    expect(component.isCorrectBin).toBeTruthy();

    evt.dragData.type = 'something-else';
    component.checkIfCompatible(evt);
    expect(component.isCorrectBin).toBeFalsy();
  });

  it('Should fire event when bomb is dropped', () => {
    const evt = {
      dragData: bombTypeOne
    };

    component.bombDropped(evt);

    component.bombCollected.subscribe(data => {
      expect(data.bomb).toBe(bombTypeOne);
      expect(data.isSameType).toBeTruthy();
    });

    expect(component.isCorrectBin).toBeFalsy();
  });

  it('Should fire event when bomb is dropped - and flag wrong bin', () => {
    const evt = {
      dragData: bombTypeOne
    };
    evt.dragData.type = 'another-type';

    component.bombDropped(evt);

    component.bombCollected.subscribe(data => {
      expect(data.bomb).toBe(bombTypeOne);
      expect(data.isSameType).toBeFalsy();
    });

    expect(component.isCorrectBin).toBeFalsy();
  });
});
