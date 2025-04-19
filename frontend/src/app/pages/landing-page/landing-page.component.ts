import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupFormComponent } from '../../components/signup-form/signup-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SignupFormComponent],
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  ngOnInit() {
    // Remove Tally script since we're not using it anymore
  }
} 