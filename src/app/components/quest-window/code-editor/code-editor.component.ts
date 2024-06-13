import { NgClass } from "@angular/common";
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { CodeExecutionService } from "../../../services/code-execution.service";
import { AlgorithmicQuest } from "../../../interfaces/algorithmic-quest.interface";

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [MonacoEditorModule, FormsModule, TranslateModule, NgClass],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss'
})
export class CodeEditorComponent implements OnInit {
  @Input({required: true}) quest!: AlgorithmicQuest;

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  userCode: string= '';
  codeRunning = this.codeExecutionService.isExecutionInProgress;

  constructor(private codeExecutionService: CodeExecutionService) {}

  ngOnInit() {
    this.userCode = this.quest.missingCodeTemplate;
  }

  runCode() {
    const code = this.quest.uncompletedCode + this.userCode;

    if (this.editorOptions.language === 'typescript') {
      this.codeExecutionService.runTypeScriptCode(code);
    } else if (this.editorOptions.language === 'javascript') {
      this.codeExecutionService.runJavaScriptCode(code);
    } else {
      console.error('Unsupported language');
    }
  }
}
