import { UtilsService } from './../../services/utils.service';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { BombComponent } from './bomb.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import * as _ from 'lodash';

describe('BombComponent', () => {
  let component: BombComponent;
  let fixture: ComponentFixture<BombComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BombComponent ],
      providers: [ UtilsService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined lifetime between 5 and 10', () => {
    expect(component.lifetime).toBeGreaterThanOrEqual(5);
    expect(component.lifetime).toBeLessThanOrEqual(11);
  });

  it('should emit an event after N(lifetime) seconds', fakeAsync(() => {
    const lifetime = component.lifetime;

    component.bombExploded.subscribe(exploded => {
      expect(exploded).toBeTruthy();
    });

    _.fill(Array(lifetime), 1).map(() => {
      tick();
    });
  }));
});
