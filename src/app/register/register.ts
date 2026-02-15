import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  regData = {
    username: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    console.log('Registering user:', this.regData);

    this.authService.register(this.regData);
    this.router.navigateByUrl('/home');
  }
}
