import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Registration successful');
        this.router.navigate(['/login']); // Redirect to login after registration
      },
      error: (error) => {
        console.error('Registration failed', error);
        // Handle registration error (show message, etc.)
      }
    });
  }
}
