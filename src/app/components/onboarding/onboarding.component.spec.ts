import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from "@ngx-translate/core";
import { TRANSLATE_SERVICE_STUB } from "../../utils/mocks";

import { OnboardingComponent } from './onboarding.component';

describe('OnboardingComponent', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingComponent],
      providers: [
        TRANSLATE_SERVICE_STUB
      ]
    })
      .compileComponents();

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(OnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set flag when preface completed', () => {
    component.isPrefaceCompleted = false;

    component.onCompletePreface();

    expect(component.isPrefaceCompleted).toBeTruthy();
  });

  it('should emit event when onboarding completed', () => {
    const spy = spyOn(component.completed, 'emit');
    component.activeStepIndex = component.steps.length - 1;

    component.onPaging(1);

    expect(spy).toHaveBeenCalled();
  });

  it('should increment step index', () => {
    component.activeStepIndex = 0;
    const spy = spyOn(component.completed, 'emit');

    component.onPaging(1);

    expect(component.activeStepIndex).toBe(1);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should increment step index', () => {
    component.activeStepIndex = 1;
    const spy = spyOn(component.completed, 'emit');

    component.onPaging(-1);

    expect(component.activeStepIndex).toBe(0);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should switch language', () => {
    const language = 'uk';
    const mockEvent = {target: {value: language}} as any as Event;
    const spy = spyOn(translateService, 'use');

    component.onLanguageChanges(mockEvent);

    expect(spy).toHaveBeenCalledOnceWith(language);
  });
});
