import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from "ng-mocks";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { TRANSLATE_SERVICE_STUB } from "../../../utils/mocks";

import { CodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeEditorComponent, MockModule(MonacoEditorModule.forRoot())],
      providers: [
        TRANSLATE_SERVICE_STUB,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
