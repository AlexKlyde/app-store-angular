import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (!expDate) return null;

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: any) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Wrong email');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password');
        break;
      default:
        this.error$.next('An unknown error occured!');
    }

    return throwError(() => error);
  }

  private setToken(res: AuthResponse | null) {
    if (!res) {
      localStorage.clear();
      return;
    }

    const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000)
    localStorage.setItem('token', res.idToken)
    localStorage.setItem('token-exp', expDate.toString())
  }
}