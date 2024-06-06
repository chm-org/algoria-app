import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceWarningComponent } from './device-warning.component';

describe('DeviceWarningComponent', () => {
  let component: DeviceWarningComponent;
  let fixture: ComponentFixture<DeviceWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceWarningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
