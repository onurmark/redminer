import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Pipe, PipeTransform } from '@angular/core';

import { RedmineService } from '../redmine.service';

import { Project } from '../project';
import { Version } from '../version';

import { VersionCreateDialogComponent } from './version-create-dialog.component';

@Component({
  selector: 'app-redminer',
  templateUrl: './redminer.component.html',
  styleUrls: ['./redminer.component.css']
})
export class RedminerComponent implements OnInit {
  formGroup: FormGroup;
  projects: Project[] = [];
  versions: Version[] = [];
  selectedProject: Project;

  constructor(
    private fb: FormBuilder,
    private redmineService: RedmineService,
    private dialog: MatDialog,
  ) {
    this.formGroup = fb.group({
      'project': '',
    });
    this.formGroup.controls['project'].valueChanges.subscribe((project: Project) => {
      this.redmineService.getProjectVersionList(project.id).subscribe(versions => {
        this.versions = versions;
      });
      this.selectedProject = project;
    });
    this.redmineService.getProjectList().subscribe(
      projects => {
        console.log('projects: ' + projects.length);
        this.projects = projects;
      }
    );
  }

  ngOnInit() {
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
      this.redmineService.createVersion(this.selectedProject.id, version).subscribe(result => {
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
