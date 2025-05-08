import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-page',
  imports: [SidebarComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  @Input() isHomePage = false;
}
