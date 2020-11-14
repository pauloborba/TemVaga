import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteRegisterComponent } from './route-register.component';

describe('RouteRegisterComponent', () => {
  let component: RouteRegisterComponent;
  let fixture: ComponentFixture<RouteRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
