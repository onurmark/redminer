import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { RedmineService } from '../redmine.service';

import { Version } from '../version';
import { Project } from '../project';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @Input() private version: Version;
  versions: Version[];
  date: number = Date.now();

  constructor(
    private redmineService: RedmineService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.redmineService.getProjectVersionList(this.version.project.id).subscribe((versions) => {
      this.versions = versions;
      this.versions.sort((a,b) => {
        const d1: Date = new Date(a.due_date);
        const d2: Date = new Date(b.due_date);

        if (d1 < d2) {
          return 1;
        }
        if (d1 > d2) {
          return -1;
        }

        return 0;
      });
    });
  }

}
