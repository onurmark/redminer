import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { RedmineService } from '../redmine.service';

import { Version } from '../version';

@Component({
  selector: 'app-version-detail',
  templateUrl: './version-detail.component.html',
  styleUrls: ['./version-detail.component.css']
})
export class VersionDetailComponent implements OnInit {
  @Input() version: Version;
  versionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private redmineService: RedmineService,
  ) {
    this.versionForm = fb.group({
      name: ['', Validators.required],
      description: '',
      status: 'open',
      wiki_page_title: '',
      sharing: 'none',
    });
  }

  ngOnInit() {
  }

  onUpdate() {
    const version: Version = new Version(this.versionForm.value);
    console.log(version);
    this.redmineService.updateVersion(this.version.id, version).subscribe(result => {
      console.log(result);
    });
  }
}
