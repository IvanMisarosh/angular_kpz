import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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
