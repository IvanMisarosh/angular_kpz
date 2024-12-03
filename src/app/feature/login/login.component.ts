import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (submit)="onLogin()">
      <input type="text" [(ngModel)]="username" placeholder="Username" name="username" required />
      <input type="password" [(ngModel)]="password" placeholder="Password" name="password" required />
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  username: string = '';  // Initialize with an empty string
  password: string = '';  // Initialize with an empty string

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log('Login successful');
          this.router.navigate(['/car']); // Redirect after successful login
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login error (show message, etc.)
        }
      });
  }
}
