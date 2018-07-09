import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RedmineService } from '../redmine.service';

import { Project } from '../project';
import { Version } from '../version';

@Component({
  selector: 'app-version-create-dialog',
  templateUrl: './version-create-dialog.component.html',
  styleUrls: ['./version-create-dialog.component.css']
})
export class VersionCreateDialogComponent implements OnInit {
  versionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<VersionCreateDialogComponent>,
    private fb: FormBuilder,
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

  onCreate(): void {
    this.dialogRef.close(this.versionForm.value);
  }
}
