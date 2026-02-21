import { Component } from '@angular/core';
import { CartService } from '../services/cart-service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  myItems: any[] = []

  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.loadCart()
  }

  loadCart() {
    this.myItems = this.cartService.getItems()
  }

  removeItem(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This item will be removed from your gear.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#121212',
      cancelButtonColor: '#ff4d4d',
      confirmButtonText: 'Yes, remove it',
      background: '#121212', color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeItem(index)
        this.loadCart()
        this.showSuccess('Removed!')
      }
    })
  }

  changeQuantity(index: number, delta: number) {
    const item = this.myItems[index]
    
    if (item.quantity === 1 && delta === -1) {
      Swal.fire({
        icon: "warning", title: "Oops...", text: "Minimum quantity is 1",
        background: '#121212', color: '#fff',
      })
      return
    }

    this.cartService.updateQuantity(index, delta)
    this.loadCart()
  }

  total() {
    return this.myItems.reduce((acc, item) => {
      const activePrice = item.salePrice ?? item.price ?? 0
      return acc + (activePrice * item.quantity)
    }, 0)
  }

  private showSuccess(msg: string) {
    Swal.fire({ title: msg, icon: 'success', background: '#121212', color: '#fff', timer: 1500, showConfirmButton: false })
  }
}
