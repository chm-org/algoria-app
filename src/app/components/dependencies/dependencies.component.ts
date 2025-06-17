import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Challenge } from 'algoria-utils';
import { Button } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-dependencies',
  imports: [
    Popover,
    Button
  ],
  templateUrl: './dependencies.component.html',
  styleUrl: './dependencies.component.scss'
})
export class DependenciesComponent implements OnChanges {
  @Input() ids: string[] = [];
  @Output() challengeSelected = new EventEmitter<string>();
  challenges: Challenge[] = [];

  constructor(
    private stateService: StateService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ids']) {
      this.challenges = this.ids
        .map(id => this.stateService.getChallenge(id))
        .filter(Boolean) as Challenge[];
    }
  }

  onChallengeSelected(id: string) {
    this.challengeSelected.emit(id);
  }
}
