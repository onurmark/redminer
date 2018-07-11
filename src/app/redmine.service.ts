import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project';
import { Version } from './version';
import { Issue, IssueStatus } from './issue';

export const REDMINE_API_URL: string = 'http://192.168.218.65/redmine';
export const REDMINE_API_KEY: string = '7d813688a0098b8a2822c4142cc72dc45c4270b5';

/*
export const REDMINE_API_URL: string = 'http://192.168.201.144/';
export const REDMINE_API_KEY: string = '4ad769a919bbe21a4350bd248af0860e1e75aab0';
*/

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

  getProject(id: number) : Observable<Project> {
    const url = `${this.apiUrl}/projects/${id}.json`;
    return this.http.get<Project>(url, httpOptions).pipe(
      map((response) => {
        console.log(response);
        return response['project'];
      })
    );
  }

  getProjectList(): Observable<Project[]> {
    const url = `${this.apiUrl}/projects.json?limit=1000`;
    return this.http.get(url, httpOptions).pipe(map(response => {
      console.log('response', response);
      return <any>response['projects'].map(item => {
        console.log("raw project", item);
        return new Project({
          id: item.id,
          name: item.name,
          identifier: item.identifier,
          description: item.description,
          parent: item.parent
        });
      });
    }));
  }

  getProjectVersionList(projectId: number): Observable<Version[]> {
    const url = `${this.apiUrl}/projects/${projectId}/versions.json`;
    return this.http.get<Version[]>(url, httpOptions).pipe(
      map(response => {
        return response['versions'].map(item => {
          console.log("raw version", item);
          return new Version(item);
        });
      })
    );
  }

  getVersion(id: number): Observable<Version> {
    const url = `${this.apiUrl}/versions/${id}.json`
    return this.http.get<Version>(url, httpOptions).pipe(
      map(response => {
        return response['version'];
      })
    );
  }

  createVersion(projectId: number, version: Version): Observable<any> {
    const url = `${this.apiUrl}/projects/${projectId}/versions.json`;
    return this.http.post(url, {version: {
      name: version.name,
      status: version.status,
      sharing: version.sharing,
      due_date: version.due_date,
      description: version.description,
      wiki_page_title: version.wiki_page_title
    }}, httpOptions);
  }

  updateVersion(id: number, obj: object): Observable<any> {
    const url = `${this.apiUrl}/versions/${id}.json`;
    return this.http.put(url, {version: obj}, httpOptions);
  }

  deleteVersion(version: Version): Observable<any> {
    const url = `${this.apiUrl}/versions/${version.id}.json`;
    return this.http.delete(url, httpOptions);
  }

  getIssues(projectId: number, versionId: number, status: string, sort: string, offset: number, limit: number): Observable<any> {
    const params: string = [
      `status_id=${status}`,
      `project_id=${projectId}`,
      `fixed_version_id=${versionId}`,
      `sort=${sort}`,
      `offset=${offset}`,
      `limit=${limit}`,
    ].join('&');

    const queryUrl = `${this.apiUrl}/issues.json?${params}`;

    return this.http.get(queryUrl, httpOptions);
  }

  updateIssue(issueId: number, data: object): Observable<any> {
    const queryUrl = `${this.apiUrl}/issues/${issueId}.json`;
    return this.http.put(queryUrl, {issue: data}, httpOptions);
  }

  getIssueStatuses(): Observable<IssueStatus[]> {
    const queryUrl = `${this.apiUrl}/issue_statuses.json`;
    return this.http.get(queryUrl, httpOptions).pipe(
      map(response => {
        console.log(response);
        return response['issue_statuses'].map(item => {
          return new IssueStatus(item);
        })
      })
    );
  }
}
