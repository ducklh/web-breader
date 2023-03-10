import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatiticalComponent } from './statitical.component';

describe('StatiticalComponent', () => {
  let component: StatiticalComponent;
  let fixture: ComponentFixture<StatiticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatiticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatiticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
