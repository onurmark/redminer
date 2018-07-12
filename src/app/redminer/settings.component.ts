import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SettingsComponent>
  ) {
    this.settingsForm = fb.group({
      apiUrl: ['', Validators.required],
      apiKey: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSave() {
    console.log(this.settingsForm.value);
    localStorage.setItem('redmine', this.settingsForm.value);
    this.dialogRef.close();
  }
}
