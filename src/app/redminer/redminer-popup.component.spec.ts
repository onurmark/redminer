import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedminerPopupComponent } from './redminer-popup.component';

describe('RedminerPopupComponent', () => {
  let component: RedminerPopupComponent;
  let fixture: ComponentFixture<RedminerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedminerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedminerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
