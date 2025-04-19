import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LinkService } from '../../services/link.service';
import { Link } from '@shared/types';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PickerComponent, EmojiModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  links: Link[] = [];
  username: string = '';
  title: string = '';
  isEditingTitle: boolean = false;
  readonly MAX_TITLE_LENGTH = 50;
  isPreviewMode: boolean = false;
  showEmojiPicker: { [key: number]: boolean } = {};

  // Emoji Mart configuration
  emojiMartOptions = {
    showPreview: true,
    emojiSize: 24,
    set: 'apple' as const,
    style: {
      width: '320px',
      position: 'absolute',
      zIndex: '100'
    }
  };

  get placeholderText(): string {
    return this.username + "'s links";
  }

  constructor(private linkService: LinkService) {}

  ngOnInit(): void {
    this.username = this.linkService.getUsername();
    this.title = this.linkService.getTitle();
    this.linkService.getLinks().subscribe((data) => {
      this.links = data;
    });
  }

  togglePreviewMode() {
    this.isPreviewMode = !this.isPreviewMode;
    // Reset any editing states when switching to preview
    if (this.isPreviewMode) {
      this.links = this.links.map(link => ({ ...link, isEditing: false }));
    }
  }

  addLink() {
    this.linkService.addLink().subscribe((data) => {
      this.links = data;
    });
  }

  updateLink(index: number, newLink: Link) {
    this.linkService.updateLink(index, newLink).subscribe((data) => {
      this.links = data;
    });
  }

  deleteLink(index: number) {
    this.linkService.deleteLink(index).subscribe((data) => {
      this.links = data;
    });
  }

  editLink(index: number) {
    this.links[index].isEditing = true;
  }
  
  saveLink(index: number) {
    this.links[index].isEditing = false;
    this.updateLink(index, this.links[index]); // optional if you want to persist
  }

  updateLabel(index: number, newLabel: string) {
    const link = this.links[index];
    this.updateLink(index, { ...link, label: newLabel });
  }
  
  updateUrl(index: number, newUrl: string) {
    const link = this.links[index];
    this.updateLink(index, { ...link, url: newUrl });
  }

  cancelEdit(index: number) {
    // Reset any changes made to the link
    this.linkService.getLinks().subscribe((data) => {
      this.links = data;
      this.links[index].isEditing = false;
    });
  }

  updateTitle(newTitle: string) {
    if (newTitle.length <= this.MAX_TITLE_LENGTH) {
      this.linkService.updateTitle(newTitle).subscribe(title => {
        this.title = title;
        this.isEditingTitle = false;
      });
    }
  }

  moveUp(index: number) {
    if (index > 0) {
      const newLinks = [...this.links];
      [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
      this.linkService.reorderLinks(index, index - 1).subscribe(links => {
        this.links = links;
      });
    }
  }

  moveDown(index: number) {
    if (index < this.links.length - 1) {
      const newLinks = [...this.links];
      [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
      this.linkService.reorderLinks(index, index + 1).subscribe(links => {
        this.links = links;
      });
    }
  }

  toggleEmojiPicker(index: number) {
    // Initialize the value if it doesn't exist
    if (this.showEmojiPicker[index] === undefined) {
      this.showEmojiPicker[index] = false;
    }
    
    // Close any other open pickers
    Object.keys(this.showEmojiPicker).forEach(key => {
      if (parseInt(key) !== index) {
        this.showEmojiPicker[parseInt(key)] = false;
      }
    });
    
    // Toggle the current picker
    this.showEmojiPicker[index] = !this.showEmojiPicker[index];
    console.log('Emoji picker toggled for index', index, 'new value:', this.showEmojiPicker[index]);
  }

  addEmoji(event: EmojiEvent, index: number) {
    if (this.links[index]) {
      // Prepend the emoji to the link title
      this.links[index].label = event.emoji.native + ' ' + (this.links[index].label || '');
      this.showEmojiPicker[index] = false;
      this.updateLink(index, this.links[index]);
    }
  }
}