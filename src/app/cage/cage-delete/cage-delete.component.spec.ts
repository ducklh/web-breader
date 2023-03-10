import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageDeleteComponent } from './cage-delete.component';

describe('CageDeleteComponent', () => {
  let component: CageDeleteComponent;
  let fixture: ComponentFixture<CageDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
