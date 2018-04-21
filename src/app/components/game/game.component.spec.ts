import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { GameComponent } from './game.component';
import { BombComponent } from './components/bomb/bomb.component';
import { BasketComponent } from './components/basket/basket.component';
import { UtilsService } from './../../services/utils.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        BombComponent,
        BasketComponent
       ],
       providers: [ UtilsService ],
       schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should have filled baskets and bombs after onInit', () => {
    expect(component.basketCollection).toBeUndefined();
    expect(component.bombs).toEqual([]);

    fixture.detectChanges();

    expect(component.basketCollection).toBeDefined();
    expect(component.basketCollection.length).toBe(3);
    expect(component.bombs).toEqual([]); // No bomb spawned yet
  });

  it('Should get personal best on local storage', () => {
    const personalBest = window.localStorage.getItem('personalBest') || '';
    expect(component.personalBest).toBe('');

    fixture.detectChanges();

    expect(component.personalBest).toBe(personalBest);
  });

  it('Should shuffle baskets every 40 secods', fakeAsync(() => {
    fixture.detectChanges();

    tick(40000);
    fixture.detectChanges();
    const time = component.timeUntilShuffle();

    expect(time).toBe(40);
    expect(component.bombs.length).toBeGreaterThanOrEqual(0);

    // Let the time pass until there is no more
    // bombs spawing
    tick(6 * 40000);
    discardPeriodicTasks();
  }));

  it('Should spawn 120 bombs', fakeAsync(() => {
    fixture.detectChanges();

    tick(160000);
    fixture.detectChanges();
    const points = component.points;
    const bombs = component.bombs.length;

    const totalBombs = points + bombs;

    expect(totalBombs).toBe(120);

    discardPeriodicTasks();
  }));
});
