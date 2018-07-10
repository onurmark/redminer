import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { mergeMap } from 'rxjs/operators';

import { RedmineService } from '../redmine.service';

import { Project } from '../project';

@Component({
  selector: 'app-redminer',
  templateUrl: './redminer.component.html',
  styleUrls: ['./redminer.component.css']
})
export class RedminerComponent implements OnInit {
  formGroup: FormGroup;
  projects: Project[] = [];

  constructor(
    private fb: FormBuilder,
    private redmineService: RedmineService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.formGroup = fb.group({
      'project': '',
    });

    this.redmineService.getProjectList().pipe(
      mergeMap(projects => {
        this.projects = projects;
        return this.formGroup.controls['project'].valueChanges;
      })
    ).subscribe((project: Project) => {
      this.router.navigate(['redminer/project', project.id]);
    });
  }

  ngOnInit() {
  }
}

