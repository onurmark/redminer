import {
  RedmineService,
  REDMINE_API_URL,
  REDMINE_API_KEY,
} from './redmine.service';

export const RedmineInjectables: Array<any> = [
  { provide: RedmineService, useClass: RedmineService },
  { provide: REDMINE_API_URL, useValue: REDMINE_API_URL },
  { provide: REDMINE_API_KEY, useValue: REDMINE_API_KEY },
];
