// import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }         from './app.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { SubscriberService }    from './subscriber.service';
import { HappeningService }     from './happening.service';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule}     from './app-routing.module';
import { HappeningsComponent } from './happenings/happenings.component';
import { HappeningsAdminComponent } from './happenings-admin/happenings-admin.component';
// import { GamesComponent } from './games/games.component';
// import { GameDetailsComponent } from './game-details/game-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SubscribersComponent,
    // HappeningsComponent,
    HappeningsAdminComponent,
    // GamesComponent,
    // GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    SubscriberService,
    HappeningService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
