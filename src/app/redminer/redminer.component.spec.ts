
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RedminerComponent } from './redminer.component';

describe('RedminerComponent', () => {
  let component: RedminerComponent;
  let fixture: ComponentFixture<RedminerComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [RedminerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
