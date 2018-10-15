import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

import { RedmineService } from '../redmine.service';

import { Version } from '../version';

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
	if (displayFormat === 'input') {
	  const day = date.getUTCDate();
	  const month = date.getUTCMonth() + 1;
	  const year = date.getFullYear();
	  // Return the format as per your requirement
	  return `${year}-${this._to2digit(month)}-${this._to2digit(day)}`;
	} else {
	  return date.toISOString();
	}
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

const DATE_FORMATS = {
  parse: {
    dateInput: {month: 'numeric', year: 'numeric', day: 'numeric'}
  },
  display: {
	dateInput: 'input',
	monthYearLabel: {year: 'numeric', month: 'short'},
	dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
	monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ]
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
      due_date: '',
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
      due_date: this.version.due_date,
      wiki_page_title: this.version.wiki_page_title,
      sharing: this.version.sharing
    });
  }

  onUpdate() {
    let value = this.versionForm.value;

    if (value['due_date']) {
      console.log('date: ' + value['due_date']);
      value['due_date'] =
        new Date(this.versionForm.controls['due_date'].value).toISOString().slice(0, 10);
    }

    this.redmineService.updateVersion(
      this.version.id, value).subscribe(
        () => {
          console.log(value);
          this.updated.emit(value);
        }
    );
  }

  getVersionUrl(id: number) {
    return this.redmineService.getApiUrl() + '/versions/' + id;
  }
}

