import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Version } from '../version';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit, OnDestroy {
  version: Version;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initializeVersion();
      }
    })
  }

  ngOnInit() {
  }

  initializeVersion(): void {
    this.version = this.route.snapshot.data['version'];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
