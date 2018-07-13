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
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { RedminerPopupComponent } from './redminer/redminer-popup.component';
import { RedminerEventComponent } from './redminer/redminer-event.component';

import { SettingsService } from './settings.service';
import { RedmineService } from './redmine.service';
import { VersionComponent } from './redminer/version.component';

import { VersionResolver } from './version.resolver';
import { IssuesComponent } from './redminer/issues.component';
import { IssuesMoveDialogComponent } from './redminer/issues-move-dialog.component';
import { VersionCreateDialogComponent } from './redminer/version-create-dialog.component';
import { OverviewComponent } from './redminer/overview.component';
import { TimelineComponent } from './redminer/timeline.component';
import { OptionsComponent } from './redminer/options.component';
import { RedminerComponent, VersionNameFilterPipe, VersionStatusFilterPipe } from './redminer/redminer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SettingsComponent } from './redminer/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    RedminerPopupComponent,
    RedminerEventComponent,
    VersionComponent,
    IssuesComponent,
    IssuesMoveDialogComponent,
    VersionCreateDialogComponent,
    OverviewComponent,
    TimelineComponent,
    OptionsComponent,
    RedminerComponent,
    VersionNameFilterPipe,
    VersionStatusFilterPipe,
    SettingsComponent,
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
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LayoutModule,
  ],
  entryComponents: [
    VersionCreateDialogComponent,
    IssuesMoveDialogComponent,
    SettingsComponent,
  ],
  providers: [
    RedmineService,
    SettingsService,
    VersionResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
