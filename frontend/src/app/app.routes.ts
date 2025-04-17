import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicProfileComponent } from './pages/public-profile/public-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'home', component: LandingPageComponent },
  { path: ':username', component: PublicProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];