import { inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from '../models/product';
import { AuthService } from './auth-service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor() {
    this.refreshCart()
  }

  items: Product[] = []
  private auth = inject(AuthService)

  getCartKey() {
    let userJson = localStorage.getItem('currentUser')
    if (userJson) {
      let user = JSON.parse(userJson)
      return `cart_${user.email}`
    }
    return 'cart_guest'
  }

  addToCart(product: Product) {
    this.items = this.getItems()

    let existingItem = this.items.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity ?? 0) + 1
    }

    else {
      this.items.push({ ...product, quantity: 1 })
    }

    this.saveItems(this.items)
    this.showToast('Added to cart!', 'success')
  }

  updateQuantity(index: number, delta: number) {
    const items = this.getItems()
    if (items[index]) {
      items[index].quantity = (items[index].quantity ?? 1) + delta
      
      if (items[index].quantity <= 0) {
        items.splice(index, 1)
      }
      
      this.saveItems(items)
    }
  }

  removeItem(index: number) {
    const items = this.getItems()
    items.splice(index, 1)
    this.saveItems(items)
  }

  getItems(): Product[] {
    let key = this.getCartKey()
    let savedCart = localStorage.getItem(key)
    return savedCart ? JSON.parse(savedCart) : []
  }

  saveItems(items: Product[]) {
    let key = this.getCartKey()
    localStorage.setItem(key, JSON.stringify(items))
  }

  refreshCart() {
    this.items = this.getItems()
  }

  clearCart() {
    let key = this.getCartKey()
    this.items = []
    localStorage.removeItem(key)
    return this.items
  }

  private showToast(title: string, icon: 'success' | 'info') {
    Swal.fire({
      title: title,
      icon: icon,
      background: '#121212',
      color: '#fff',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    })
  }
}

