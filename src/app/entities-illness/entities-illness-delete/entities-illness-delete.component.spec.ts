import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesIllnessDeleteComponent } from './entities-illness-delete.component';

describe('EntitiesIllnessDeleteComponent', () => {
  let component: EntitiesIllnessDeleteComponent;
  let fixture: ComponentFixture<EntitiesIllnessDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesIllnessDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesIllnessDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
