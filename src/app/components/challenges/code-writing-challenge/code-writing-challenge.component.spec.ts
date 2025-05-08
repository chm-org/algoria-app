import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeWritingChallengeComponent } from './code-writing-challenge.component';

xdescribe('CodeWritingChallengeComponent', () => {
  let component: CodeWritingChallengeComponent;
  let fixture: ComponentFixture<CodeWritingChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeWritingChallengeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeWritingChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
