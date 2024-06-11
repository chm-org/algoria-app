import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TRANSLATE_SERVICE_STUB } from "../../utils/mocks";

import { DeviceWarningComponent } from './device-warning.component';

describe('DeviceWarningComponent', () => {
  let component: DeviceWarningComponent;
  let fixture: ComponentFixture<DeviceWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceWarningComponent],
      providers: [
        TRANSLATE_SERVICE_STUB
      ]
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
