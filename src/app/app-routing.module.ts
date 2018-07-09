import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedminerComponent } from './redminer/redminer.component';
import { OverViewComponent } from './redminer/overview.component';
import { RedminerEventComponent } from './redminer/redminer-event.component';
import { RedminerPopupComponent } from './redminer/redminer-popup.component';
import { VersionComponent } from './redminer/version.component';
import { VersionResolver } from './version.resolver';


const routes: Routes = [
  { path: '', redirectTo: '/redminer', pathMatch: 'full' },
  {
    path: 'redminer',
    component: RedminerComponent,
    children: [
      {
        path: 'version/:id',
        component: VersionComponent,
        resolve: {
          version: VersionResolver,
        }
      },
    ],
    runGuardsAndResolvers: 'always'
  },
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
