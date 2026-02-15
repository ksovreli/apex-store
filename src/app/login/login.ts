import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginData = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    let response = this.authService.login(this.loginData)
    if (response.success) {
      this.router.navigateByUrl('/home')
    }
    
    else {
      alert(response.message)
    }
  }
}
