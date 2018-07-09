import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedminerComponent } from './redminer.component';

describe('RedminerComponent', () => {
  let component: RedminerComponent;
  let fixture: ComponentFixture<RedminerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedminerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
