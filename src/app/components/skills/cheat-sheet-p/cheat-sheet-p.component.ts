import {Component, input, InputSignal} from '@angular/core';
import {AppChallenge} from "../../../interfaces/app-challenge.interface";

@Component({
  selector: 'app-cheat-sheet-p',
  imports: [],
  templateUrl: './cheat-sheet-p.component.html',
  styleUrl: './cheat-sheet-p.component.scss'
})
export class CheatSheetPComponent {
  cheatSheet: InputSignal<AppChallenge | undefined> = input()
}
