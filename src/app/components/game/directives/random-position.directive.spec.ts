import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RandomPositionDirective } from './random-position.directive';
import { Component, DebugElement, style } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RandomPositionDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: Array<DebugElement>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        RandomPositionDirective
      ],
      providers: [ UtilsService ]
    }).createComponent(TestComponent);
    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(RandomPositionDirective));
    des = [...des];
  });

  it('should have two elements with directive', () => {
    expect(des.length).toBe(2);
  });

  it('should have changed the elements style - position to absolute', () => {
    const expectedPositions = ['absolute', 'absolute'];
    const positions = des.map(de => de.nativeElement.style.position);

    expect(positions[0]).toEqual(expectedPositions[0]);
    expect(positions[1]).toEqual(expectedPositions[1]);
  });

});

@Component({
  template: `
  <div appRandomPosition>Testing</div>
  <div appRandomPosition>Directive</div>
  <div class="regular-div">Position</div>
  `
})
export class TestComponent {
  constructor() {}

}
