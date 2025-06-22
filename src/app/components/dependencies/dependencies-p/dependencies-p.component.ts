import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppChallenge } from '../../../interfaces/app-challenge.interface';
import { SkillTreePipe } from '../../../pipes/skill-tree.pipe';

@Component({
  selector: 'app-dependencies-p',
  imports: [
    SkillTreePipe
  ],
  templateUrl: './dependencies-p.component.html',
  styleUrl: './dependencies-p.component.scss'
})
export class DependenciesPComponent {
  @Input({required: true}) challenges: AppChallenge[] = [];
  @Output() challengeSelected = new EventEmitter<string>();
  @Output() skillTreeSelected = new EventEmitter<string>();

  onChallengeSelected(id: string): void {
    this.challengeSelected.emit(id);
  }

  onSkillSelected(skillTreeId: string) {
    this.skillTreeSelected.emit(skillTreeId);
  }
}
