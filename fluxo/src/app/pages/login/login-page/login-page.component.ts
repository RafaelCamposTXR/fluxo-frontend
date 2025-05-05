import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  credentials = { username: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response: { access_token: any; }) => {
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
