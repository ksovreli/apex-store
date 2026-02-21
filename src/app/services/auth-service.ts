import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  isLoggedIn = signal<boolean>(!!localStorage.getItem('userToken'))

  constructor() {
    this.autoLogin()
  }

  private getUsers(): User[] {
    const users = localStorage.getItem('apex_users')
    return users ? JSON.parse(users) : []
  }

  private generateRandomToken(): string {
    const randomPart = Math.random().toString(36).substring(2)
    const timePart = Date.now().toString(36)
    return `apex_${randomPart}${timePart}`
  }
  private autoLogin() {
    const token = localStorage.getItem('userToken')
    if (!token) return

    let users = this.getUsers()
    let matchedUser = users.find(u => u.token === token)

    if (matchedUser) {
      localStorage.setItem('currentUser', JSON.stringify(matchedUser))
      this.isLoggedIn.set(true)
    }
    
    else {
      this.logout()
    }
  }

  login(credentials: User): { success: boolean; message: string } {
    let users = this.getUsers()
    let userIndex = users.findIndex(
      u => u.email === credentials.email && u.password === credentials.password
    )

    if (userIndex !== -1) {
      let user = users[userIndex]

      if (!user.token) {
        user.token = this.generateRandomToken()
        localStorage.setItem('apex_users', JSON.stringify(users))
      }

      localStorage.setItem('userToken', user.token)
      localStorage.setItem('currentUser', JSON.stringify(user))
      
      this.isLoggedIn.set(true)
      return { success: true, message: 'Login successful' }
    }

    return { success: false, message: 'Invalid email or password' }
  }

  register(credentials: User): { success: boolean; message: string } {
    const users = this.getUsers()

    if (users.find(u => u.email === credentials.email)) {
      return { success: false, message: 'User already exists' }
    }

    let newUser: User = { 
      ...credentials, 
      token: this.generateRandomToken() 
    }
    
    users.push(newUser)
    localStorage.setItem('apex_users', JSON.stringify(users))

    return this.login(credentials)
  }

  logout() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('currentUser')
    this.isLoggedIn.set(false)
  }
}