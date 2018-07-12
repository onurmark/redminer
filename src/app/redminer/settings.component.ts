import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SettingsComponent>,
    private settingsService: SettingsService,
  ) {
    this.settingsForm = fb.group({
      apiUrl: ['', Validators.required],
      apiKey: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.rebuildForm();
  }

  rebuildForm(): void {
    this.settingsForm.reset({
      apiUrl: this.settingsService.getApiUrl(),
      apiKey: this.settingsService.getApiKey(),
    })
  }

  onSave() {
    console.log(this.settingsForm.value);
    this.settingsService.setApiUrl(this.settingsForm.controls['apiUrl'].value);
    this.settingsService.setApiKey(this.settingsForm.controls['apiKey'].value);
    this.dialogRef.close();
  }
}
