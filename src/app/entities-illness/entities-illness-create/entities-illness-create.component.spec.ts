import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesIllnessCreateComponent } from './entities-illness-create.component';

describe('EntitiesIllnessCreateComponent', () => {
  let component: EntitiesIllnessCreateComponent;
  let fixture: ComponentFixture<EntitiesIllnessCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesIllnessCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesIllnessCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
