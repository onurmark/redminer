import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redminer-popup',
  templateUrl: './redminer-popup.component.html',
  styleUrls: ['./redminer-popup.component.css']
})
export class RedminerPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    chrome.tabs.create({url: 'index.html'})
  }
}
