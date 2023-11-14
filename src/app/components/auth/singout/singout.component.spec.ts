import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingoutComponent } from './singout.component';

describe('SingoutComponent', () => {
  let component: SingoutComponent;
  let fixture: ComponentFixture<SingoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingoutComponent]
    });
    fixture = TestBed.createComponent(SingoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
