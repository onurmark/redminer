import { Component, OnInit } from '@angular/core';

import { RedmineService } from '../redmine.service';

import { Project } from '../project';

@Component({
  selector: 'app-redminer',
  templateUrl: './redminer.component.html',
  styleUrls: ['./redminer.component.css']
})
export class RedminerComponent implements OnInit {

  constructor(
    private redmineService: RedmineService,
  ) { }

  ngOnInit() {
  }

  getProjects() : void {
    this.redmineService.getProjectList().subscribe(
      projects => {
        console.log('projects: ' + projects)
      }
    )
  }
}
