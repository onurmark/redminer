import { Component, OnInit, OnChanges, Input, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CollectionViewer, DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';

import { MatPaginator, MatSort } from '@angular/material';

import { BehaviorSubject, merge, Observable, of as ObservableOf } from 'rxjs';
import { catchError, map, tap, startWith, switchMap } from 'rxjs/operators';

import { RedmineService } from '../redmine.service';

import { Project } from '../project';
import { Version } from '../version';
import { Issue } from '../issue';

import { IssuesMoveDialogComponent } from './issues-move-dialog.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() version: Version;

  issueDataSource: IssueDataSource;
  displayedColumns: string[] = ['select', 'id', 'status', 'subject', 'author.name', 'done_ratio'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  issueStatus: string = '*';
  selection: SelectionModel<Issue>;

  change: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private redmineService: RedmineService,
    private dialog: MatDialog,
  ) {
    const initialSelection = [];
    const allowMultiSelect = true;

    this.selection = new SelectionModel<Issue>(allowMultiSelect, initialSelection);
    this.issueDataSource = new IssueDataSource(this.redmineService);
  }


  ngOnInit() {
  }

  ngOnChanges() {
    this.paginator.pageIndex = 0;

    this.change.emit();
  }

  onChangeStatus(): void {
    this.reloadIssues();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.change).pipe(
      tap(() => {
        const order = this.sort.direction === 'asc' ? this.sort.active : `${this.sort.active}:desc`;

        this.issueDataSource.loadIssues(
          this.version.project.id,
          this.version.id,
          this.issueStatus,
          order,
          this.paginator.pageIndex * this.paginator.pageSize,
          this.paginator.pageSize
        )

        this.selection.clear();
      })
    ).subscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.issueDataSource.data.length;

    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.issueDataSource.data.forEach(issue => this.selection.select(issue));
  }

  reloadIssues() {
    const order = this.sort.direction === 'asc' ? this.sort.active : `${this.sort.active}:desc`;

    this.issueDataSource.loadIssues(
      this.version.project.id,
      this.version.id,
      this.issueStatus,
      order,
      this.paginator.pageIndex * this.paginator.pageSize,
      this.paginator.pageSize
    );

    this.selection.clear();
  }

  onMoveVersionBtn(): void {
    const dialogRef = this.dialog.open(IssuesMoveDialogComponent, {
      width: '500px',
      data: this.version
    });

    dialogRef.afterClosed().subscribe(versionId => {
      if (!versionId) {
        return;
      }
      this.selection.selected.forEach((issue) => {
        this.redmineService.updateIssue(issue.id, {
          fixed_version_id: versionId
        }).subscribe(() => {
          this.reloadIssues()
        });
      });
    });
  }
}

export class IssueDataSource implements DataSource<Issue> {
  private issueSubject = new BehaviorSubject<Issue[]>([]);

  paginator: MatPaginator;
  sort: MatSort;
  data: Issue[] = [];
  totalCount: number = 0;

  constructor (
    private redmineService: RedmineService,
  ) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Issue[]> {
    return this.issueSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.issueSubject.complete();
  }

  loadIssues(project_id: number, version_id: number, status='*', sort='', offset=0, pageSize=25) {
    this.redmineService!.getIssues(
      project_id,
      version_id,
      status,
      sort,
      offset,
      pageSize).subscribe(response => {
        console.log('response: ', response);
        this.issueSubject.next(response['issues']);
        this.data = response['issues'];
        this.totalCount = response.total_count;
      });
  }

}
