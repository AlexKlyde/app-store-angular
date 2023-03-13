import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error;
  submitted = false;
  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/admin', 'dashboard']);
    }
  }

  get email() { return this.loginForm.controls['email']; }
  get password() { return this.loginForm.controls['password']; }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.submitted = true;

    const user: User = {
      email: this.email.value,
      password: this.password.value,
    }

    this.auth.login(user).subscribe({
      next: () => {
        this.loginForm.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      error: () => this.submitted = false
    });

    console.log(user);
  }

}
