import { NgComponentOutlet } from '@angular/common';
import { Component, Input, signal, Type } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { SkillsComponent } from '../../skills/skills.component';

interface DrawerTrigger {
  slug: string;
  icon: string;
  label: string;
  component: Type<any>;
}

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
export class SidebarComponent {
  @Input() isHomePage = false;
  isExpanded = signal(false);
  readonly triggers: DrawerTrigger[] = [{
    slug: 'skills',
    icon: 'pi pi-lightbulb',
    label: 'Skills',
    component: SkillsComponent,
  }]
  activeTrigger: DrawerTrigger | null = null;

  onToggleDrawer(trigger: DrawerTrigger) {
    this.isExpanded() ? this.onCloseDrawer() : this.onOpenDrawer(trigger);
  }

  onOpenDrawer(trigger: DrawerTrigger) {
    this.isExpanded.set(true);
    this.activeTrigger = trigger;
  }

  onCloseDrawer() {
    this.isExpanded.set(false);
    this.activeTrigger = null;
  }
}
