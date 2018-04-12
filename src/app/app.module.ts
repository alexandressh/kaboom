import { DragulaModule } from 'ng2-dragula';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BombComponent } from './components/bomb/bomb.component';
import { BasketComponent } from './components/basket/basket.component';
import { RandomPositionDirective } from './directives/random-position.directive';
import { UtilsService } from './services/utils.service';

@NgModule({
  declarations: [
    AppComponent,
    BombComponent,
    BasketComponent,
    RandomPositionDirective
  ],
  imports: [
    BrowserModule,
    DragulaModule
  ],
  providers: [
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
