import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  @Input() basketType;

  constructor() { }

  ngOnInit() {
  }

}
