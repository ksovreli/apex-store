import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  items: Product[] = []

  ngOnInit(){
    this.refreshWishlist()
  }

  getWishListKey() {
    let userJson = localStorage.getItem('currentUser')
    if (userJson) {
      let user = JSON.parse(userJson)
      return `wishlist_${user.email}`
    }
    return 'wishlist_guest'
  }

  toggleWishlist(product: Product) {
    this.items = this.getItems()
    let index = this.items.findIndex(item => item.id === product.id)

    if (index > -1) {
      this.items.splice(index, 1)
      this.showToast('Removed from wishlist', 'info')
    } 
    
    else {
      this.items.push(product);
      this.showToast('Added to wishlist!', 'success')
    }

    this.saveItems(this.items)
  }

  getItems(): Product[] {
    let key = this.getWishListKey()
    let savedWishlist = localStorage.getItem(key)
    return savedWishlist ? JSON.parse(savedWishlist) : []
  }

  saveItems(items: Product[]) {
    let key = this.getWishListKey()
    localStorage.setItem(key, JSON.stringify(items))
  }

  refreshWishlist() {
    this.items = this.getItems()
  }

  isInWishlist(productId: number | string): boolean {
    return this.getItems().some(item => item.id === productId)
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
