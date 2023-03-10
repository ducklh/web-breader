import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeleteComponent } from './new-delete.component';

describe('NewDeleteComponent', () => {
  let component: NewDeleteComponent;
  let fixture: ComponentFixture<NewDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
