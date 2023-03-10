import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesDeleteComponent } from './entities-delete.component';

describe('EntitiesDeleteComponent', () => {
  let component: EntitiesDeleteComponent;
  let fixture: ComponentFixture<EntitiesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
