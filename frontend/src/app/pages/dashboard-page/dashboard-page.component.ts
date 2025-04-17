import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinkService } from '../../services/link.service';
import { Link } from '../../../../../libs/shared';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
}