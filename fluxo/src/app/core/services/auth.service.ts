import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.FLUXO_BACK_END}/token`;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', credentials.username)
      .set('password', credentials.password)
      .set('scope', '')
      .set('client_id', 'string') // Substitua pelo seu client_id
      .set('client_secret', 'string'); // Substitua pelo seu client_secret

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    
    return this.http.post(this.apiUrl, body.toString(), { headers });
  }

  // Método para armazenar o token
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para recuperar o token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}