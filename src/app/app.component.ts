import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { UserRepository } from './services/user.repository';


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet
    ],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    private userRepo: UserRepository,
    private translateService: TranslateService
  ) {
    const lang = this.userRepo.user().language;
    this.translateService.use(lang || 'en');
  }
}
