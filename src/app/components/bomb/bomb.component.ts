import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss']
})
export class BombComponent implements OnInit {
  @Input() bombType: string;

  constructor() { }

  ngOnInit() {
  }

}
