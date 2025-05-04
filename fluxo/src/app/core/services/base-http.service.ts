import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  protected baseUrl: string = environment.FLUXO_BACK_END;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para criar headers
  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  protected get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const headers = this.createHeaders();
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params, headers });
  }

  protected post<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  protected put<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  protected delete<T>(endpoint: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers });
  }

  protected patch<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }
}
