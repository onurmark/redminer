import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedminerEventComponent } from './redminer-event.component';

describe('RedminerEventComponent', () => {
  let component: RedminerEventComponent;
  let fixture: ComponentFixture<RedminerEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedminerEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedminerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
