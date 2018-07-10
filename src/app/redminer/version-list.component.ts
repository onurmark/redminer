import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';

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
export class VersionListComponent implements OnInit {
  project: Project;
  versions: Version[] = [];
  subscription: Subscription;

  constructor(
    private redmineService: RedmineService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initializeVersionList();
      }
    })
  }

  ngOnInit() {
  }

  initializeVersionList(): void {
    this.project = this.route.snapshot.data['project'];
    console.log(this.project);
    this.redmineService.getProjectVersionList(this.project.id).subscribe(versions => {
      this.versions = versions;
    });
  }

  onCreateNewVersion(): void {
    const dialogRef = this.dialog.open(VersionCreateDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('here');
      if (!result) {
        return;
      }
      const version: Version = new Version(result);
      this.redmineService.createVersion(this.project.id, version).subscribe(result => {
        this.versions.push(new Version(result.version));
      });
    });
  }

  onRemoveVersion(event: Event, version: Version): void {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.redmineService.deleteVersion(version).subscribe(result => {
      console.log(result);
      const index = this.versions.indexOf(version);
      if (index !== -1) this.versions.splice(index, 1);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

    return versions.filter(version => 
      version.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    );
  }
}
