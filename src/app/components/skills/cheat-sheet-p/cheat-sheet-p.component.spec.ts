import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatSheetPComponent } from './cheat-sheet-p.component';

xdescribe('CheatSheetPComponent', () => {
  let component: CheatSheetPComponent;
  let fixture: ComponentFixture<CheatSheetPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheatSheetPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheatSheetPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
