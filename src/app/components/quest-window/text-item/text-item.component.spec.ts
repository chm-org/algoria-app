import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextItem, TextItemType } from "../../../interfaces/text-item.interface";
import { TRANSLATE_SERVICE_STUB } from "../../../utils/mocks";

import { TextItemComponent } from './text-item.component';

const MOCK_PARAMETER: TextItem = {
  type: TextItemType.Text,
  body: "Lorem ipsum",
  title: "Lorem"
};

describe('TextItemComponent', () => {
  let component: TextItemComponent;
  let fixture: ComponentFixture<TextItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextItemComponent],
      providers: [
        TRANSLATE_SERVICE_STUB,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TextItemComponent);
    component = fixture.componentInstance;
    component.parameter = MOCK_PARAMETER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
