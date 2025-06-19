import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesPComponent } from './dependencies-p.component';

describe('DependenciesPComponent', () => {
  let component: DependenciesPComponent;
  let fixture: ComponentFixture<DependenciesPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciesPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependenciesPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
