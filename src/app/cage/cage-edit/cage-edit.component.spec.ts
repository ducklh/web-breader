import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageEditComponent } from './cage-edit.component';

describe('CageEditComponent', () => {
  let component: CageEditComponent;
  let fixture: ComponentFixture<CageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
