import { Injectable, signal, Type } from '@angular/core';
import { SkillsComponent } from '../components/skills/skills.component';


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
  private readonly _isExpanded = signal(false);
  readonly isExpanded = this._isExpanded.asReadonly();
  readonly menuItems: MenuItem[] = [{
    slug: 'skills',
    icon: 'pi pi-lightbulb',
    label: 'Skills',
    component: SkillsComponent,
  }]
  private readonly _activeMenuItem = signal<MenuItem | null>(null);
  readonly activeMenuItem = this._activeMenuItem.asReadonly();

  open(item: MenuItem): void {
    this._activeMenuItem.set(item);
    this._isExpanded.set(true);
  }

  close(): void {
    this._isExpanded.set(false);
    this._activeMenuItem.set(null);
  }

  showSkills(): void {
    const skills = this.menuItems.find(item => item.slug === 'skills');

    if (skills) {
      this.open(skills);
    } else {
      console.error('Skills menu item not found.');
    }
  }
}
