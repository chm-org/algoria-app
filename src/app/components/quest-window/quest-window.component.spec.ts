import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { MockProvider } from "ng-mocks";
import { QUESTS } from "../../consts/quests";
import { MOCK_QUEST, TRANSLATE_SERVICE_STUB } from "../../utils/mocks";

import { QuestWindowComponent } from './quest-window.component';

describe('QuestWindowComponent', () => {
  let component: QuestWindowComponent;
  let fixture: ComponentFixture<QuestWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestWindowComponent],
      providers: [
        TRANSLATE_SERVICE_STUB,
        MockProvider(Router),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestWindowComponent);
    component = fixture.componentInstance;
    component.lastCompletedQuestId = MOCK_QUEST.id;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to congrats page if game finished', () => {
    const lastCompletedQuestId = QUESTS[QUESTS.length - 1]?.id;
    component.lastCompletedQuestId = lastCompletedQuestId;
    const mockChanges = {
      lastCompletedQuestId: {
        previousValue: undefined,
        currentValue: lastCompletedQuestId,
        firstChange: false,
        isFirstChange: () => false
      }
    };
    const spy = spyOn(TestBed.inject(Router), 'navigate');

    component.ngOnChanges(mockChanges);

    expect(spy).toHaveBeenCalledWith(['/congratulations']);
  });

  it('should set introduction completed flag', () => {
    component.isIntroductionCompleted = false;

    component.onIntroCompleted();

    expect(component.isIntroductionCompleted).toBeTruthy();
  });
});
