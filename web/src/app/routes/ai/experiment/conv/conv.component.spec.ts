import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AiExperimentConvComponent } from './conv.component';

describe('AiExperimentConvComponent', () => {
  let component: AiExperimentConvComponent;
  let fixture: ComponentFixture<AiExperimentConvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiExperimentConvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiExperimentConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
