import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Project } from './project';
import { Observable } from 'rxjs';
import { RedmineService } from './redmine.service';

@Injectable()
export class ProjectResolver implements Resolve<Project> {
  constructor(private redmineService: RedmineService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
    return this.redmineService.getProject(route.params['id']);
  }
}
