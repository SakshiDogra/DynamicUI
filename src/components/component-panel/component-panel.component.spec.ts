import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPanelComponent } from './component-panel.component';

describe('ComponentPanelComponent', () => {
  let component: ComponentPanelComponent;
  let fixture: ComponentFixture<ComponentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
