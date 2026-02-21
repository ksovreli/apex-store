import { Component, inject } from '@angular/core';
import { WishlistService } from '../services/wishlist-service';
import { Product } from '../models/product';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
  public wishlistService = inject(WishlistService)
  public router = inject(Router)
  public cartService = inject(CartService)

  ngOnInit() {
    this.wishlistService.refreshWishlist()
  }

  moveToCart(product: Product) {
    let user = localStorage.getItem('currentUser')
    if (!user){
      this.showToast('Please login to add items to cart', 'info')
      this.router.navigateByUrl("/login")
    }

    else {
      this.cartService.addToCart(product)
    }
  }

  clearAll() {
    this.wishlistService.items = []
    this.wishlistService.saveItems([])
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
