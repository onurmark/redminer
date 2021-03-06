import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Subscription, Observable, of as ObservableOf } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { RedmineService } from '../redmine.service';

import { Project } from '../project';
import { Version } from '../version';

import { VersionCreateDialogComponent } from './version-create-dialog.component';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.css']
})
export class VersionListComponent implements OnInit, OnChanges {
  @Input() project: Project;
  versions: Version[] = [];
  subscription: Subscription;

  constructor(
    private redmineService: RedmineService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.initializeVersionList();
  }

  initializeVersionList(): void {
    this.redmineService.getProjectVersionList(this.project.id).subscribe(versions => {
      this.versions = versions;
    });
  }

  onCreateNewVersion(): void {
    const dialogRef = this.dialog.open(VersionCreateDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().pipe(
      mergeMap(result => {
        return this.redmineService.createVersion(this.project.id, new Version(result));
      })
    ).subscribe(
      (result) => {
        this.versions.push(new Version(result.version));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getStatusIconString(version: Version): string {
    let iconString = '';

    if (version.status === 'open') {
      iconString = 'play_arrow';
    } else if (version.status === 'closed') {
      iconString = 'stop';
    } else if (version.status === 'locked') {
      iconString = 'lock';
    }

    return iconString;
  }
}

@Pipe({
  name: 'versionFilter',
  pure: false
})
export class VersionFilterPipe implements PipeTransform {
  transform(versions: Version[], filter: String): any {
    if (!versions || !filter) {
      return versions;
    }

    return versions.filter(
      version => version.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    );
  }
}
