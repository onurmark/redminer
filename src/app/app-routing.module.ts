import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedminerComponent } from './redminer/redminer.component';
import { RedminerEventComponent } from './redminer/redminer-event.component';
import { RedminerPopupComponent } from './redminer/redminer-popup.component';


const routes: Routes = [
  { path: '', redirectTo: '/redminer', pathMatch: 'full' },
  { path: 'redminer', component: RedminerComponent },
  { path: 'event', component: RedminerEventComponent },
  { path: 'popup', component: RedminerPopupComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
