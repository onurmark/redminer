import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesMoveDialogComponent } from './issues-move-dialog.component';

describe('IssuesMoveDialogComponent', () => {
  let component: IssuesMoveDialogComponent;
  let fixture: ComponentFixture<IssuesMoveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesMoveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesMoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
