import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageListComponent } from './cage-list.component';

describe('CageListComponent', () => {
  let component: CageListComponent;
  let fixture: ComponentFixture<CageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
