import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RedmineService } from '../redmine.service';

import { Version } from '../version';

@Component({
  selector: 'app-issues-move-dialog',
  templateUrl: './issues-move-dialog.component.html',
  styleUrls: ['./issues-move-dialog.component.css']
})
export class IssuesMoveDialogComponent implements OnInit {
  formGroup: FormGroup;
  versions: Version[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IssuesMoveDialogComponent>,
    private redmineService: RedmineService,
    @Inject(MAT_DIALOG_DATA) private version: Version ,
  ) {
    this.formGroup = fb.group({
      version: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.redmineService.getProjectVersionList(this.version.project.id).subscribe(versions => {
      this.versions = versions.filter(version => {
        return version.id !== this.version.id;
      });
    });
  }

  onMove(): void {
    const id = this.formGroup.controls['version'].value;
    this.dialogRef.close(id);
  }
}
