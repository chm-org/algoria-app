import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { MockProvider } from "ng-mocks";
import { TRANSLATE_SERVICE_STUB } from "../../utils/mocks";
import { CongratulationsComponent } from './congratulations.component';

describe('CongratulationsComponent', () => {
  let component: CongratulationsComponent;
  let fixture: ComponentFixture<CongratulationsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongratulationsComponent,],
      providers: [
        MockProvider(Router),
        TRANSLATE_SERVICE_STUB
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(CongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate confeti after view inited', () => {
    const spy = spyOn(component, "createConfetti");

    component.ngAfterViewInit();

    expect(spy).toHaveBeenCalled()
  });
});
