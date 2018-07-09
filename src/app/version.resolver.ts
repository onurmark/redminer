import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Version } from './version';
import { Observable } from 'rxjs';
import { RedmineService } from './redmine.service';

@Injectable()
export class VersionResolver implements Resolve<Version> {
  constructor(private redmineService: RedmineService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Version> {
    return this.redmineService.getVersion(route.params['id']);
  }
}
