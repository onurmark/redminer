import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { RedmineService } from '../redmine.service';

import { Version } from '../version';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {
  @Input() version: Version;
  @Output() updated = new EventEmitter<object>();
  versionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private redmineService: RedmineService,
    private route: ActivatedRoute,
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

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.versionForm.reset({
      name: this.version.name,
      description: this.version.description,
      status: this.version.status,
      wiki_page_title: this.version.wiki_page_title,
      sharing: this.version.sharing
    });
  }

  onUpdate() {
    this.redmineService.updateVersion(
      this.version.id, this.versionForm.value).subscribe(
        () => {
          console.log(this.versionForm.value);
          this.updated.emit(this.versionForm.value);
        }
    );
  }
}
