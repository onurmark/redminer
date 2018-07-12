import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedminerComponent } from './redminer/redminer.component';
import { RedminerEventComponent } from './redminer/redminer-event.component';
import { RedminerPopupComponent } from './redminer/redminer-popup.component';
import { VersionListComponent } from './redminer/version-list.component';
import { VersionComponent } from './redminer/version.component';
import { TimelineComponent } from './redminer/timeline.component';
import { OptionsComponent } from './redminer/options.component';

import { VersionResolver } from './version.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/redminer', pathMatch: 'full' },
  { path: 'redminer', component: RedminerComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'event', component: RedminerEventComponent },
  { path: 'popup', component: RedminerPopupComponent },
  { path: 'options', component: OptionsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
