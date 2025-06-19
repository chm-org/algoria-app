import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsPComponent } from './skills-p.component';

describe('SkillsPComponent', () => {
  let component: SkillsPComponent;
  let fixture: ComponentFixture<SkillsPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
