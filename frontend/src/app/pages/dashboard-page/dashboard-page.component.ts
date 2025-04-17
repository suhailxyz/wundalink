import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { Link } from '../../../../../libs/shared';
import { FormsModule } from '@angular/forms'; // 👈 this is the fix
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  username = 'dashingfox39'; // still mocked
  links: Link[] = [];

  constructor(private linkService: LinkService) {}

  ngOnInit(): void {
    this.linkService.getLinks().subscribe((data) => {
      this.links = data;
    });
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
}