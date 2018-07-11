import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  onSave(value: string) {
    localStorage.redminer = value;
  }

  onLoad() {
    console.log(localStorage.redminer);
  }
}
