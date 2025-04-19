import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private readonly SCRIPT_URL = environment.googleScriptUrl;

  constructor() {}

  addEmail(email: string): Observable<boolean> {
    const body = JSON.stringify({
      email,
      source: window.location.href
    });
    
    return from(fetch(this.SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: body
    })).pipe(
      map(() => true),
      catchError(error => {
        console.error('Signup failed:', error);
        return throwError(() => new Error('Failed to sign up. Please try again.'));
      })
    );
  }
} 