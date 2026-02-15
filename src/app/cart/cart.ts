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
  constructor(private cartService: CartService) { }

  ngOnInit() {
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
      background: '#121212',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.myItems.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(this.myItems))
        this.cartService.items = this.myItems

        Swal.fire({
          title: 'Removed!',
          icon: 'success',
          background: '#121212',
          color: '#fff',
          timer: 1500,
          showConfirmButton: false
        })
      }
    })
  }

  changeQuantity(index: number, delta: number) {
    const item = this.myItems[index]
    item.quantity += delta

    if (item.quantity < 1) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Quantity cannot be less than 1",
        background: '#121212',
        color: '#fff',
      })
      item.quantity = 1
    }

    else {
      localStorage.setItem('cart', JSON.stringify(this.myItems))
      this.cartService.items = this.myItems
    }
  }

  total() {
  return this.myItems.reduce((acc, item) => {
    let activePrice = item.salePrice ?? item.price ?? 0
    return acc + (activePrice * item.quantity)
  }, 0)
}

}
