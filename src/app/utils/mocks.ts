import { EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MockProvider } from "ng-mocks";
import { EMPTY } from "rxjs";
import { AlgorithmicQuest } from "../interfaces/algorithmic-quest.interface";

export const TRANSLATE_SERVICE_STUB = MockProvider(
  TranslateService,
  {
    use: (lang: string) => undefined,
    get: (key: string) => EMPTY,
    onTranslationChange: new EventEmitter(),
    onLangChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  },
  'useValue')

export const MOCK_QUEST: AlgorithmicQuest = {
  congratulationText: "",
  coverImageUrl: "",
  description: {
    intro: "",
    parameters: [],
    expectedResult: []
  },
  expectedResult: '',
  hint: {
    description: [],
    pseudocode: []
  },
  id: "1.1",
  intro: "",
  level: 0,
  match(actualResult: any): boolean {
    return false;
  },
  name: "",
  quest: 0,
  uncompletedCode: 'function partialImplementation() {}',
  missingCodeTemplate: 'function test() {}'
}
