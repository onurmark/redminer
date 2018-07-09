import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project';

export const REDMINE_API_URL: string = 'http://192.168.218.65/redmine';
export const REDMINE_API_KEY: string = '7d813688a0098b8a2822c4142cc72dc45c4270b5';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    })
};

@Injectable({
  providedIn: 'root'
})
export class RedmineService {

  constructor(
    private http: HttpClient,
    @Inject(REDMINE_API_URL) private apiUrl: string,
    @Inject(REDMINE_API_KEY) private apiKey: string
  ) {
    httpOptions.headers = httpOptions.headers.set('X-Redmine-API-Key', REDMINE_API_KEY);
  }

  getProjectList(): Observable<Project[]> {
    const url = `${this.apiUrl}/projects.json`;
    return this.http.get(url, httpOptions).pipe(map(response => {
      return <any>response['projects'].map(item => {
        console.log("raw project", item);
        return new Project({
          id: item.id,
          name: item.name,
          identifier: item.identifier,
          description: item.description
        });
      });
    }));
  }

}
