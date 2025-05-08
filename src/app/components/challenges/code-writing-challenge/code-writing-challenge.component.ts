import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user.service';
import { PageComponent } from '../../layout/page/page.component';
import { QuestWindowComponent } from '../../quest-window/quest-window.component';

@Component({
  selector: 'app-code-writing-challenge',
  imports: [
    PageComponent,
    QuestWindowComponent
  ],
  templateUrl: './code-writing-challenge.component.html',
  styleUrl: './code-writing-challenge.component.scss'
})
export class CodeWritingChallengeComponent {
  currentUser = this.userService.getUser();

  constructor(
    private userService: UserService,
  ) {}

  onQuestCompleted({id}: {id: string}) {
    this.userService.updateUserData({lastCompletedQuestId: id});
  }
}
