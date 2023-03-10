import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesCreateComponent } from './entities-create.component';

describe('EntitiesCreateComponent', () => {
  let component: EntitiesCreateComponent;
  let fixture: ComponentFixture<EntitiesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
