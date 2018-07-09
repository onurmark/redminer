import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { RedminerComponent } from './redminer/redminer.component';
import { RedminerPopupComponent } from './redminer/redminer-popup.component';
import { RedminerEventComponent } from './redminer/redminer-event.component';

import { RedmineInjectables } from './redmine.injectable';

@NgModule({
  declarations: [
    AppComponent,
    RedminerComponent,
    RedminerPopupComponent,
    RedminerEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [RedmineInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
