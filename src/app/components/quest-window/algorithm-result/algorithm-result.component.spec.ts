import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from "ng-mocks";
import { EMPTY, of } from "rxjs";
import { CodeExecutionService } from "../../../services/code-execution.service";
import { TRANSLATE_SERVICE_STUB } from "../../../utils/mocks";
import { spyPropertyGetter } from "../../../utils/test-utils";
import { AlgorithmResultComponent } from './algorithm-result.component';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('AlgorithmResultComponent', () => {
  let component: AlgorithmResultComponent;
  let fixture: ComponentFixture<AlgorithmResultComponent>;
  let codeExecutionService: SpyObj<CodeExecutionService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmResultComponent],
      providers: [
        MockProvider(CodeExecutionService, createSpyObj([], {taskState$: EMPTY}), 'useValue'),
        TRANSLATE_SERVICE_STUB
      ]
    })
      .compileComponents();

    codeExecutionService = TestBed.inject(CodeExecutionService) as SpyObj<CodeExecutionService>;
    fixture = TestBed.createComponent(AlgorithmResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check for a match on result submission', () => {
    component.hasMatch.set(false);
    const expectedResult = 'Lorem';
    component.matcher = (result) => result === expectedResult;
    spyPropertyGetter(codeExecutionService, 'taskState$').and.returnValue(of(expectedResult));

    component.ngOnInit();

    expect(component.hasMatch()).toBeTruthy();
  });

  it('should emit match event if has a match', () => {
    component.hasMatch.set(true);
    const spy = spyOn(component.match, 'emit');

    component.onChallengeCompleted();

    expect(spy).toHaveBeenCalled();
  });

  it('should not emit match event if there is no match', () => {
    component.hasMatch.set(false);
    const spy = spyOn(component.match, 'emit');

    component.onChallengeCompleted();

    expect(spy).not.toHaveBeenCalled();
  });
});
