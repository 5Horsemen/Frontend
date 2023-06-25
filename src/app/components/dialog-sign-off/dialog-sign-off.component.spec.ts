import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSignOffComponent } from './dialog-sign-off.component';

describe('DialogSignOffComponent', () => {
  let component: DialogSignOffComponent;
  let fixture: ComponentFixture<DialogSignOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSignOffComponent]
    });
    fixture = TestBed.createComponent(DialogSignOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
