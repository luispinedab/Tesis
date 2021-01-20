import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArealistRowRenderComponent } from './arealist-row-render.component';

describe('ArealistRowRenderComponent', () => {
  let component: ArealistRowRenderComponent;
  let fixture: ComponentFixture<ArealistRowRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArealistRowRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArealistRowRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
