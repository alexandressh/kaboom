import { UtilsService } from './../../services/utils.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bomb } from './bomb.model';

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss']
})
export class BombComponent implements OnInit {
  @Input() bomb: Bomb;
  @Output() bombExploded = new EventEmitter<boolean>();

  lifetime: number;
  isExploded: boolean;

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.lifetime = this.utilsService.getRandomIntMinAndMax(5, 10);

    const intervalId = setInterval(() => {
      this.lifetime -= 1;
      if (this.lifetime <= 0) {
        this.isExploded = true;
        this.bombExploded.emit(this.isExploded);

        clearInterval(intervalId);
      }
    }, 1000);
  }

}
