import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '@services/signup.service';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="w-full">
      <div class="space-y-4">
        <div>
          <input 
            type="email" 
            formControlName="email"
            placeholder="your email"
            class="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
            [class.border-red-400]="email?.invalid && email?.touched"
          >
          <div *ngIf="email?.invalid && email?.touched" class="mt-1 text-sm text-red-500">
            <span *ngIf="email?.errors?.['required']">Email is required</span>
            <span *ngIf="email?.errors?.['email']">Please enter a valid email</span>
          </div>
          <div *ngIf="errorMessage" class="mt-1 text-sm text-red-500">
            {{ errorMessage }}
          </div>
        </div>
        
        <button 
          type="submit"
          [disabled]="signupForm.invalid || isSubmitting"
          class="w-full px-4 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isSubmitting ? 'signing up...' : 'notify me' }}
        </button>

        <div *ngIf="submitSuccess" class="text-sm text-green-600 text-center">
          Thanks! We'll keep you posted.
        </div>
      </div>
    </form>
  `,
  styles: []
})
export class SignupFormComponent {
  signupForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    
    this.isSubmitting = true;
    this.errorMessage = '';
    
    this.signupService.addEmail(this.email?.value).subscribe({
      next: () => {
        this.submitSuccess = true;
        this.signupForm.reset();
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
} 