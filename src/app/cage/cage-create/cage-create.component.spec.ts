import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageCreateComponent } from './cage-create.component';

describe('CageCreateComponent', () => {
  let component: CageCreateComponent;
  let fixture: ComponentFixture<CageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
