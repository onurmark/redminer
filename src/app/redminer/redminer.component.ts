import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map, mergeMap } from 'rxjs/operators';

import { RedmineService } from '../redmine.service';

import { Project } from '../project';
import { Version } from '../version';

import { VersionCreateDialogComponent } from './version-create-dialog.component';
import { SettingsComponent } from './settings.component';

@Component({
  selector: 'app-redminer',
  templateUrl: './redminer.component.html',
  styleUrls: ['./redminer.component.css']
})
export class RedminerComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  searchControl = new FormControl();
  projects: Project[] = [];
  filteredProjects = new BehaviorSubject<Project[]>([]);
  selectedProject: Project;
  versions: Version[] = [];
  selectedVersion: Version;

  constructor(
    private fb: FormBuilder,
    private redmineService: RedmineService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
  ) {
    let settings = localStorage.redminer;
    if (!settings) {
      this.openSettingDialog();
    }
  }

  openSettingDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '500px',
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      startWith<string | Project>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => {
        return name ? this._filter(name) : this.projects.slice()
      })
    ).subscribe(projects => {
      this.filteredProjects.next(projects);
    });

    this.redmineService.getProjectList().subscribe(projects => {
      this.projects = projects;
      this.filteredProjects.next(projects);
    });
  }

  onSelectedProject(project: Project): void {
    this.selectedProject = project;
    this.redmineService.getProjectVersionList(project.id).subscribe(versions => {
      this.versions = versions;
    });
  }

  onClearSearch(): void {
    this.searchControl.patchValue('');
  }

  private _filter(name: string): Project[] {
    const filterValue = name.toLowerCase();
    return this.projects.filter(project => project.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelectedVersion(version: Version): void {
    this.selectedVersion = version;
  }

  onCreateNewVersion(): void {
    const dialogRef = this.dialog.open(VersionCreateDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().pipe(
      mergeMap(result => {
        return this.redmineService.createVersion(this.selectedProject.id, new Version(result));
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

  onUpdatedVersion(event): void {
    this.selectedVersion.name = event.name;
    this.selectedVersion.description = event.description;
    this.selectedVersion.status = event.status;
    this.selectedVersion.wiki_page_title = event.wiki_page_title;
    this.selectedVersion.sharing = event.sharing;
  }
}
