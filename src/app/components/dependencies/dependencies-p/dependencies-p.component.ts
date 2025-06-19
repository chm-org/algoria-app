import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppChallenge } from '../../../interfaces/app-challenge.interface';

@Component({
  selector: 'app-dependencies-p',
  imports: [],
  templateUrl: './dependencies-p.component.html',
  styleUrl: './dependencies-p.component.scss'
})
export class DependenciesPComponent {
  @Input({required: true}) challenges: AppChallenge[] = [];
  @Output() select = new EventEmitter<string>();

  onChallengeSelected(id: string): void {
    this.select.emit(id);
  }
}
