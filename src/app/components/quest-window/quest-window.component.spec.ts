import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestWindowComponent } from './quest-window.component';

describe('QuestWindowComponent', () => {
  let component: QuestWindowComponent;
  let fixture: ComponentFixture<QuestWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
