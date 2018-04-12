import { UtilsService } from './../../services/utils.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss']
})
export class BombComponent implements OnInit {
  @Output() bombExploded = new EventEmitter<boolean>();

  lifetime: number;

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.lifetime = this.utilsService.getRandomIntMinAndMax(5, 10);

    const intervalId = setInterval(() => {
      this.lifetime -= 1;
      if (this.lifetime <= 0) {
        this.bombExploded.emit(null);
        clearInterval(intervalId);
      }
    }, 1000);
  }

}
