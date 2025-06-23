import { NgComponentOutlet } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { MenuItem, SidebarService } from '../../../services/sidebar.service';


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

  isExpanded = this.sidebarService.isExpanded;
  readonly menuItems = this.sidebarService.menuItems;
  activeMenuItem = this.sidebarService.activeMenuItem;

  constructor(
    private sidebarService: SidebarService,
  ) {
  }

  ngOnDestroy() {
    this.sidebarService.close();
  }

  onToggleDrawer(item: MenuItem) {
    this.isExpanded() ? this.sidebarService.close() : this.sidebarService.open(item);
  }

  onCloseDrawer() {
    this.sidebarService.close();
  }
}
