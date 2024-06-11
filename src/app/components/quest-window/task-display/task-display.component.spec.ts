import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlgorithmicQuest } from "../../../interfaces/algorithmic-quest.interface";
import { MOCK_QUEST, TRANSLATE_SERVICE_STUB } from "../../../utils/mocks";

import { TaskDisplayComponent } from './task-display.component';

describe('TaskDisplayComponent', () => {
  let component: TaskDisplayComponent;
  let fixture: ComponentFixture<TaskDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDisplayComponent],
      providers: [
        TRANSLATE_SERVICE_STUB
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskDisplayComponent);
    component = fixture.componentInstance;
    component.quest = MOCK_QUEST as AlgorithmicQuest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hint flag', () => {
    component.isHintRequested = false;

    component.showHint();

    expect(component.isHintRequested).toBeTruthy();
  });
});
