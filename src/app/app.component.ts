import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { User } from "./models/user";
import { UserService } from "./services/user.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private translateService: TranslateService
  ) {
    this.userService.setUser(User.rehydrateUserData());
    this.translateService.use(this.userService.getUser()()?.language || 'en');
  }
}
