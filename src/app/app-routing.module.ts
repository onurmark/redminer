import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedminerComponent } from './redminer/redminer.component';
import { RedminerEventComponent } from './redminer/redminer-event.component';
import { RedminerPopupComponent } from './redminer/redminer-popup.component';
import { VersionListComponent } from './redminer/version-list.component';
import { VersionComponent } from './redminer/version.component';
import { TimelineComponent } from './redminer/timeline.component';
import { ProjectResolver } from './project.resolver';
import { VersionResolver } from './version.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/redminer', pathMatch: 'full' },
  {
    path: 'redminer',
    component: RedminerComponent,
    children: [
      {
        path: 'project/:id',
        component: VersionListComponent,
        resolve: {
          project: ProjectResolver
        },
        children: [
          {
            path: 'version/:versionId',
            component: VersionComponent,
            resolve: {
              version: VersionResolver,
            }
          }
        ]
      },
      { path: 'timeline', component: TimelineComponent },
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
