import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LinkService } from '../../services/link.service';
import { Link } from '@shared/shared';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  links: Link[] = [];
  username: string = '';
  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private linkService: LinkService
  ) {}

  ngOnInit(): void {
    // For now, we'll just use the mock data regardless of username
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.title = this.linkService.getTitle();
      this.linkService.getLinks().subscribe((data) => {
        this.links = data;
      });
    });
  }
} 