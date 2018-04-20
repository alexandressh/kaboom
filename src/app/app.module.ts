import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { UtilsService } from './services/utils.service';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FinishedComponent } from './components/finished/finished.component';
import { GameModule } from './components/game/game.module';
import { GameComponent } from './components/game/game.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'finished', component: FinishedComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FinishedComponent,
  ],
  imports: [
    BrowserModule,
    GameModule,
    DndModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
