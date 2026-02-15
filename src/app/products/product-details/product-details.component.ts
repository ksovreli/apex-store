import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.route.params.subscribe(params => {
      this.productId = params['id']
    })
  }

  productId: number = 0
  product?: Product

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'))
    this.product = this.productService.getProductsById(this.productId)
    console.log(this.product)
    let id = Number(this.route.snapshot.paramMap.get('id'))
    let product = this.productService.getProductsById(id)

    if (!product) {
      this.router.navigate(['/404'], { skipLocationChange: true })
    }

    else {
      this.product = product
    }
  }

  add(product: any) {
  if (this.authService.isLoggedIn()) {
    this.cartService.addToCart(product)
    
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${product.name} is ready for the expedition.`,
      timer: 1500,
      showConfirmButton: false,
      background: '#121212',
      color: '#fff',
      iconColor: '#EEE6E6'
    })
  }

  else {
    Swal.fire({
      icon: 'error',
      title: 'Unauthorized',
      text: 'You must login before placing an order.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      iconColor: '#ff4d4d',
      background: '#121212',
      color: '#fff'
    })

    this.router.navigateByUrl("/login")
  }
}
}
