import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOGGER_FACTORY } from '../../../consts/logger-factory.token';
import { TRANSLATE_SERVICE_STUB } from "../../../utils/mocks";
import { AlgorithmResultComponent } from './algorithm-result.component';

describe('AlgorithmResultComponent', () => {
  let component: AlgorithmResultComponent;
  let fixture: ComponentFixture<AlgorithmResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmResultComponent],
      providers: [
        TRANSLATE_SERVICE_STUB,
        { provide: LOGGER_FACTORY, useValue: {create: () => ({})}}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlgorithmResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
