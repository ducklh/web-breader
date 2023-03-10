import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnititiesIllnessListComponent } from './enitities-illness-list.component';

describe('EnititiesIllnessListComponent', () => {
  let component: EnititiesIllnessListComponent;
  let fixture: ComponentFixture<EnititiesIllnessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnititiesIllnessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnititiesIllnessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
