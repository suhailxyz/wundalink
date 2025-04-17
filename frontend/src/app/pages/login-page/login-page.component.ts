import { Component } from '@angular/core';
import { MockAuthService } from '../../services/mock-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private auth: MockAuthService) {}

  login() {
    this.auth.login();
  }
}