import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderokComponent } from './headerok.component';

describe('HeaderokComponent', () => {
  let component: HeaderokComponent;
  let fixture: ComponentFixture<HeaderokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderokComponent]
    });
    fixture = TestBed.createComponent(HeaderokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
