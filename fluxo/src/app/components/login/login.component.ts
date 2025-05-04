import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Resposta do login:', response);
        this.authService.saveToken(response.access_token);
        this.router.navigate(['/tasks']);
      },
      (error) => {
        this.errorMessage = 'Login falhou. Verifique suas credenciais.';
      }
    );
  }
}