import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { monacoConfig } from '../../../app.config';

@Component({
  selector: 'app-code-editor',
  imports: [MonacoEditorModule, FormsModule, TranslateModule, NgClass],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss'
})
export class CodeEditorComponent implements OnInit {
  @Input({required: true}) boilerplateCode!: string;
  @Input({required: true}) executionInProgress!: boolean;
  @Output() executeCode = new EventEmitter<string>();

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  userCode: string = '';

  constructor() {}

  ngOnInit() {
    this.userCode = this.boilerplateCode;
    console.log(this.userCode);
  }

  runCode() {
    this.executeCode.emit(this.userCode);
  }
}
