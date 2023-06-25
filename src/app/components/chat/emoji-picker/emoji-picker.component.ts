import { Component, EventEmitter, Output } from '@angular/core';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.css']
})
export class EmojiPickerComponent {
  @Output() emojiClick = new EventEmitter<EmojiEvent>();

  addEmoji(event: EmojiEvent): void {
    this.emojiClick.emit(event);
  }
}
