import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { RedminerComponent, VersionFilterPipe } from './redminer/redminer.component';
import { RedminerPopupComponent } from './redminer/redminer-popup.component';
import { RedminerEventComponent } from './redminer/redminer-event.component';

import { RedmineInjectables } from './redmine.injectable';
import { VersionComponent } from './redminer/version.component';

import { VersionResolver } from './version.resolver';
import { VersionDetailComponent } from './redminer/version-detail.component';
import { IssuesComponent } from './redminer/issues.component';
import { IssuesMoveDialogComponent } from './redminer/issues-move-dialog.component';
import { VersionCreateDialogComponent } from './redminer/version-create-dialog.component';
import { OverviewComponent } from './redminer/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    RedminerComponent,
    VersionFilterPipe,
    RedminerPopupComponent,
    RedminerEventComponent,
    VersionComponent,
    VersionDetailComponent,
    IssuesComponent,
    IssuesMoveDialogComponent,
    VersionCreateDialogComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  entryComponents: [
    VersionCreateDialogComponent,
    IssuesMoveDialogComponent,
  ],
  providers: [
    RedmineInjectables,
    VersionResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
