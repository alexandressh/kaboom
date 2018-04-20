import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd';

import { BombComponent } from './components/bomb/bomb.component';
import { BasketComponent } from './components/basket/basket.component';
import { RandomPositionDirective } from './directives/random-position.directive';
import { UtilsService } from '../../services/utils.service';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [
    BombComponent,
    BasketComponent,
    RandomPositionDirective,
    GameComponent
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot()
  ],
  exports: [
    GameComponent
  ],
  providers: [
    UtilsService
  ],
})
export class GameModule { }
