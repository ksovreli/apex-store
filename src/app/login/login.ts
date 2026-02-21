import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private authService = inject(AuthService)
  private cartService = inject(CartService)
  private router = inject(Router)

  loginData = {
    email: '',
    password: ''
  }

  onLogin() {
    let response = this.authService.login(this.loginData)
    if (response.success) {
      this.cartService.refreshCart()
      this.router.navigateByUrl('/home')
    }
    
    else {
      alert(response.message)
    }
  }
}
