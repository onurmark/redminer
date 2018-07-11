import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map, mergeMap } from 'rxjs/operators';

import { RedmineService } from '../redmine.service';

import { Project } from '../project';

export interface ProjectGroup {
  id: number;
  name: string;
  project: Project[];
}

@Component({
  selector: 'app-redminer',
  templateUrl: './redminer.component.html',
  styleUrls: ['./redminer.component.css']
})
export class RedminerComponent implements OnInit {
  searchControl = new FormControl();
  projects: Project[] = [];
  filteredProjects = new BehaviorSubject<Project[]>([]);

  constructor(
    private fb: FormBuilder,
    private redmineService: RedmineService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
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
    this.router.navigate(['redminer/project', project.id]);
  }

  onClearSearch(): void {
    this.searchControl.patchValue('');
  }

  private _filter(name: string): Project[] {
    const filterValue = name.toLowerCase();
    return this.projects.filter(project => project.name.toLowerCase().indexOf(filterValue) === 0);
  }
}

