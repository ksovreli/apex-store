import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal<boolean>(!!localStorage.getItem('userToken'))

  private getUsers(): any[] {
    let users = localStorage.getItem('apex_users')
    return users ? JSON.parse(users) : []
  }

  private generateRandomToken(): string {
    let randomPart = Math.random().toString(36).substring(2)
    let timePart = Date.now().toString(36)
    return `apex_${randomPart}${timePart}`
  }

  login(credentials: any): { success: boolean; message: string } {
    let users = this.getUsers()
    let user = users.find(u => u.email === credentials.email && u.password === credentials.password)

    if (user) {
      let token = this.generateRandomToken()
      localStorage.setItem('userToken', token)
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.isLoggedIn.set(true)
      return { success: true, message: 'Login successful' }
    }

    return { success: false, message: 'Invalid email or password' }
  }

  register(credentials: any): { success: boolean; message: string } {
    let users = this.getUsers()

    if (users.find(u => u.email === credentials.email)) {
      return { success: false, message: 'User already exists with this email' }
    }

    users.push(credentials)
    localStorage.setItem('apex_users', JSON.stringify(users))

    return this.login(credentials)
  }

  logout() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('currentUser')
    this.isLoggedIn.set(false)
  }
}