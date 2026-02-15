import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: any[] = this.getItems();

  addToCart(product: any) {
    this.items = this.getItems();

    let existingItem = this.items.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    }

    else {
      this.items.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(this.items))
    Swal.fire({
      title: 'Added to cart!',
      icon: 'success',
      background: '#121212',
      color: '#fff',
      timer: 1500,
      showConfirmButton: false
    })
  }

  getItems() {
    let savedCart = localStorage.getItem('cart')
    if (savedCart) {
      return JSON.parse(savedCart)
    }

    else {
      return []
    }
  }

  clearCart() {
    this.items = []
    localStorage.removeItem('cart')
    return this.items
  }
}
