import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockAuthService } from '../../services/mock-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(
    private auth: MockAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Redirect to dashboard if already logged in
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.auth.login();
  }
}