import {NgComponentOutlet} from '@angular/common';
import {Component, computed, Input, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {MenuItem, SidebarService} from '../../../services/sidebar.service';


@Component({
  selector: 'app-sidebar',
  imports: [
    Button,
    NgComponentOutlet,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnDestroy {
  @Input() isHomePage = false;

  isPanelOpen = this.sidebarService.isPanelOpen;

  readonly menuItems = this.sidebarService.menuItems;
  activeMenuItem = this.sidebarService.activeMenuItem;

  protected readonly isPanelMaximized = this.sidebarService.isPanelMaximized

  constructor(
    private sidebarService: SidebarService,
  ) {
  }

  ngOnDestroy() {
    this.sidebarService.closePanel();
  }

  onToggleNavItem(item: MenuItem) {
    if (this.isPanelOpen() && this.activeMenuItem()?.slug === item.slug) {
      this.sidebarService.closePanel();
    } else {
      this.sidebarService.openPanel(item);
    }
  }

  onClosePanel() {
    this.sidebarService.closePanel();
  }

  onMinimizePanel() {
    this.sidebarService.minimizePanel();
  }
}
