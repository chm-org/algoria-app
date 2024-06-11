import { SimpleChange, SimpleChanges } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDialogComponent } from './base-dialog.component';

describe('BaseDialogComponent', () => {
  let component: BaseDialogComponent;
  let fixture: ComponentFixture<BaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has action bar if has Next control', () => {
    component.hasAction = false;
    component.hasNext = true;
    const mockChanges: SimpleChanges = {hasNext: {} as SimpleChange}

    component.ngOnChanges(mockChanges)

    expect(component.hasAction).toBeTruthy();
  });

  it('should has action bar if has Prev control', () => {
    component.hasAction = false;
    component.hasPrevious = true;
    const mockChanges: SimpleChanges = {hasPrevious: {} as SimpleChange}

    component.ngOnChanges(mockChanges)

    expect(component.hasAction).toBeTruthy();
  });
});
