import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneeSelectionComponent } from './assignee-selection.component';

describe('AssigneeSelectionComponent', () => {
  let component: AssigneeSelectionComponent;
  let fixture: ComponentFixture<AssigneeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigneeSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigneeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
