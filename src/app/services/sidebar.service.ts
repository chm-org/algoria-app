import {computed, Injectable, signal, Type} from '@angular/core';
import { SkillsComponent } from '../components/skills/skills.component';
import {SkillsService} from "./skills.service";


export interface MenuItem {
  slug: string;
  icon: string;
  label: string;
  component: Type<any>;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly _isPanelOpen = signal(false);
  readonly isPanelOpen = this._isPanelOpen.asReadonly();

  readonly hasActiveCheatSheet = computed(() => !!this.skillsService.cheatSheetId())
  readonly isPanelMaximized = computed<boolean>(() =>
    this.isPanelOpen() && this.hasActiveCheatSheet()
  );

  readonly menuItems: MenuItem[] = [{
    slug: 'skills',
    icon: 'pi pi-lightbulb',
    label: 'Skills',
    component: SkillsComponent,
  }]
  private readonly _activeMenuItem = signal<MenuItem | null>(null);
  readonly activeMenuItem = this._activeMenuItem.asReadonly();

  constructor(
    private skillsService: SkillsService,
  ) {
  }

  openPanel(item: MenuItem): void {
    this._activeMenuItem.set(item);
    this._isPanelOpen.set(true);
  }

  closePanel(): void {
    this._isPanelOpen.set(false);
    this._activeMenuItem.set(null);
  }

  showSkills(): void {
    const skills = this.menuItems.find(item => item.slug === 'skills');

    if (skills) {
      this.openPanel(skills);
    } else {
      console.error('Skills menu item not found.');
    }
  }

  minimizePanel() {
    if (this.hasActiveCheatSheet()) {
      this.skillsService.resetCheatSheet();
    }
  }
}
