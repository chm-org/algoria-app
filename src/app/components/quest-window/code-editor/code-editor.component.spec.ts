import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule, MockProvider } from "ng-mocks";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { AlgorithmicQuest } from "../../../interfaces/algorithmic-quest.interface";
import { CodeExecutionService } from "../../../services/code-execution.service";
import { MOCK_QUEST, TRANSLATE_SERVICE_STUB } from "../../../utils/mocks";

import { CodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;
  let codeExecutionService: CodeExecutionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeEditorComponent, MockModule(MonacoEditorModule.forRoot())],
      providers: [
        TRANSLATE_SERVICE_STUB,
        MockProvider(CodeExecutionService, {codeRunning: signal(false)}, 'useValue')
      ]
    })
      .compileComponents();

    codeExecutionService = TestBed.inject(CodeExecutionService);
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    component.quest = MOCK_QUEST as AlgorithmicQuest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set code template for user', () => {
    component.userCode = '';

    component.ngOnInit();

    expect(component.userCode).toEqual(MOCK_QUEST.missingCodeTemplate);
  });

  it('should run JS user code', () => {
    const spy = spyOn(codeExecutionService, 'runJavaScriptCode');
    const expectedCode = MOCK_QUEST.uncompletedCode + MOCK_QUEST.missingCodeTemplate;

    component.runCode();

    expect(spy).toHaveBeenCalledWith(expectedCode);
  });
});
