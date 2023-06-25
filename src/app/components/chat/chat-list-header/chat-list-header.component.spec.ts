import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListHeaderComponent } from './chat-list-header.component';

describe('ChatListHeaderComponent', () => {
  let component: ChatListHeaderComponent;
  let fixture: ComponentFixture<ChatListHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatListHeaderComponent]
    });
    fixture = TestBed.createComponent(ChatListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
